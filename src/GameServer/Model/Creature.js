const StateModel = invoke('GameServer/Model/State');

class CreatureModel {
    constructor(data) {
        this.model = data;
        this.state = new StateModel();
    }

    // Set

    setId(data) {
        this.model.id = data;
    }

    setHp(data) {
        this.model.hp = data;
    }

    setMp(data) {
        this.model.mp = data;
    }

    setLocX(data) {
        this.model.locX = data;
    }

    setLocY(data) {
        this.model.locY = data;
    }

    setLocZ(data) {
        this.model.locZ = data;
    }

    setHead(data) {
        this.model.head = data;
    }

    setLocXYZH(coords) {
        this.setLocX(coords.locX);
        this.setLocY(coords.locY);
        this.setLocZ(coords.locZ);
        this.setHead(coords.head);
    }

    // Get

    fetchId() {
        return this.model.id;
    }

    fetchName() {
        return this.model.name;
    }

    fetchTitle() {
        return this.model.title;
    }

    fetchLevel() {
        return this.model.level;
    }

    fetchHp() {
        return this.model.hp;
    }

    fetchMaxHp() {
        return this.model.maxHp;
    }

    fetchMp() {
        return this.model.mp;
    }

    fetchMaxMp() {
        return this.model.maxMp;
    }

    fetchPAtk() {
        return this.model.pAtk;
    }

    fetchPDef() {
        return this.model.pDef;
    }

    fetchMAtk() {
        return this.model.mAtk;
    }

    fetchMDef() {
        return this.model.mDef;
    }

    fetchAtkSpd() {
        return this.model.atkSpd;
    }

    fetchCastSpd() {
        return this.model.castSpd;
    }

    fetchWalk() {
        return this.model.walk;
    }

    fetchRun() {
        return this.model.run;
    }

    fetchSwim() {
        return this.model.swim;
    }

    fetchRadius() {
        return this.model.radius;
    }

    fetchSize() {
        return this.model.size;
    }

    fetchLocX() {
        return this.model.locX;
    }

    fetchLocY() {
        return this.model.locY;
    }

    fetchLocZ() {
        return this.model.locZ;
    }

    fetchHead() {
        return this.model.head;
    }
}

module.exports = CreatureModel;