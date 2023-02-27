const ServerResponse = invoke('GameServer/Network/Response');
const DataCache      = invoke('GameServer/DataCache');
const Database       = invoke('Database');

class Backpack {
    constructor(data) {
        data.push(
            { id: 4900000, selfId: 1665, name: "World Map" },
            { id: 4900001, selfId:   18, name: "Leather Shield" },
            { id: 4900002, selfId:   57, name: "Adena", amount: 1337 }
        ); // TODO: Test data, please delete

        this.items = [];
        data.forEach((item) => {
            const details = DataCache.items.find(ob => ob.selfId === item.selfId);
            this.items.push({
                ...item, ...utils.crushOb(details ?? {})
            });
        });
    }

    updateDatabaseTimer(characterId) {
        clearTimeout(this.dbTimer);

        this.dbTimer = setTimeout(() => {
            (this.items.filter(ob => ob.equipped !== undefined) ?? []).forEach((item) => {
                Database.updateItemEquipState(characterId, item);
            });
        }, 5000);
    }

    fetchItems() {
        return this.items;
    }

    useItem(session, id) {
        const intentionItem = (id, success, fail = () => {}) => {
            const item = this.items.find(ob => ob.id === id);
            item ? success(item) : fail();
        };

        intentionItem(id, (item) => {
            if (item.kind === "Armor") {
                this.unequipGear(session, item.slot);
                session.actor.paperdoll.equip(item.slot, item.id, item.selfId);
                item.equipped = true;
            }
            else
            if (item.kind === "Weapon") {
                if (item.slot ===  7 || item.slot === 8) {
                    this.unequipGear(session, 14); // Both hands
                }
                else
                if (item.slot === 14) {
                    this.unequipGear(session,  7); // R
                    this.unequipGear(session,  8); // L
                }

                this.unequipGear(session, item.slot);
                session.actor.paperdoll.equip(item.slot, item.id, item.selfId);
                item.equipped = true;
            }
            else {
                if (item.selfId === 1665) { // TODO: This needs to be out of here...
                    session.dataSend(
                        ServerResponse.showMap(item.selfId)
                    );
                    return;
                }

                utils.infoWarn('GameServer:: unhandled item action');
            }
        });
    }

    unequipGear(session, slot) {
        const removeItem = (slot, success, fail = () => {}) => {
            const item = this.items.find(ob => ob.id === session.actor.paperdoll.fetchId(slot));
            item ? success(item) : fail;
        };

        // Start a database timer to update equipped state
        this.updateDatabaseTimer(session.actor.fetchId());

        removeItem(slot, (item) => {
            // Unequip from actor
            session.actor.paperdoll.unequip(slot);
            item.equipped = false;

            // Move item to the end (not official?)
            this.items = this.items.filter(ob => ob.id !== item?.id);
            this.items.unshift(item);
        });
    }
}

module.exports = Backpack;