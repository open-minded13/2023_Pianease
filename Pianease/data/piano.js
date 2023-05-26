//const song_keys="C4C4G4G4A4A4G4F4F4E4E4D4D4C4G4G4F4F4E4E4D4G4G4F4F4E4E4D4C4C4G4G4A4A4G4F4F4E4E4D4D4C4";
//const finger_num="114455434332215544332554433211445543433221";
/*const pianoKeys=[
    {note: 'C4', finger:1},
    {note: 'C4', finger:1},
    {note: 'G4', finger:4},
    {note: 'G4', finger:4},
    {note: 'A4', finger:5},
    {note: 'A4', finger:5},
    {note: 'G4', finger:4},
    {note: 'F4', finger:3},
    {note: 'F4', finger:4},
    {note: 'E4', finger:3},
    {note: 'E4', finger:3},
    {note: 'D4', finger:2},
    {note: 'D4', finger:2},
    {note: 'C4', finger:1},
];*/
//---------------------------------------------------------------------
/*data={
    currentKey : "C4",
    currentFinger : "1",
    currentKeyTimes:"1",
    nextKey:"C4",
    nextFinger:"1",
    NextKeyTimes:"1",
}*/

const socket = new WebSocket('ws://192.168.78.243:81/');
socket.addEventListener('open', () => {
    //socket.send('Hello server!');
});

//let currentTimes=null;
let lastKey = null;
socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    // 在此处处理音符数据，例如更新网页上对应琴键的颜色
    const currentKeyElement = document.getElementById(data.currentKey);
    const nextKeyElement = document.getElementById(data.nextKey);
    if (lastKey) {
        lastKey.style.backgroundColor = "white";
        lastKey.textContent = "";
    }

    //change current key style
    if (data.currentKeyTimes == "0") {
        //currentkeyElement.classList.add('yellow_key');
        currentKeyElement.style.backgroundColor = "yellow";
        //currentTimes="0";
    }
    else if (data.currentKeyTimes == "1") {
        //currentkeyElement.classList.add('red_key');
        currentKeyElement.style.backgroundColor = "red";
        //currentTimes="1";
    }
    else {
        //currentkeyElement.classList.add('pink_key');
        currentKeyElement.style.backgroundColor = "pink";
        //currentTimes="2";

    }
    //change next key style
    if (data.NextKeyTimes == "0") {
        nextKeyElement.style.backgroundColor = "yellow";
    }
    else if (data.NextKeyTimes == "1") {
        nextKeyElement.style.backgroundColor = "red";
    }
    else {
        nextKeyElement.style.backgroundColor = "pink";

    }
    currentKeyElement.textContent = data.currentFinger;
    nextKeyElement.textContent = data.nextFinger;
    lastKey = currentKeyElement;

});
