const ServerResponse = invoke('GameServer/Network/Response');

function revive(session, actor) {
    session.dataSend(ServerResponse.revive(actor.fetchId()));
    actor.automation.replenishVitals(actor);

    setTimeout(() => {
        actor.state.setDead(false);
        session.dataSend(ServerResponse.socialAction(actor.fetchId(), 9)); // SWAG stand-up
    }, 2500);
}

module.exports = revive;