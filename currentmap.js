function applyShadow(textElement) {
    textElement.shadowColor = Color.black();
    textElement.shadowRadius = 2;
}

function formatMapName(mapId) {
    const parts = mapId.split('_');
    const prefix = parts[0];
    const name = parts.slice(1).join('_');
    const cleanName = name.charAt(0).toUpperCase() + name.slice(1);
    const type = prefix === 'de' ? 'Defusal' : (prefix === 'cs' ? 'Hostage' : 'Unknown');
    return `${cleanName} - ${type}`;
}

const url = "https://purecsgo.com/api/servers";
const req = new Request(url);
const json = await req.loadJSON();
const server = json.rows[0];
const imgUrl = `https://purecsgo.com/assets/static/images/maps/large/${server.map}.webp`;
const imgReq = new Request(imgUrl);
const image = await imgReq.loadImage();

let widget = new ListWidget();
widget.backgroundImage = image;
widget.addSpacer();

let title = widget.addText(server.name);
title.font = Font.boldSystemFont(18);
title.textColor = Color.white();
applyShadow(title);

let mapInfo = widget.addText(formatMapName(server.map));
mapInfo.font = Font.systemFont(14);
mapInfo.textColor = Color.white();
applyShadow(mapInfo);

let players = widget.addText(`Players: ${server.players}/${server.maxplayers}`);
players.font = Font.systemFont(14);
players.textColor = Color.white();
applyShadow(players);

if (config.runsInWidget) {
    Script.setWidget(widget);
} else {
    widget.presentMedium();
}
Script.complete();
