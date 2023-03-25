const notifData = JSON.parse(JSON.stringify(notificationsData));
console.log(notifData)

const notifCountElement = document.querySelector(".notification-count");
notifCountElement.textContent = notifData.notificationsCount;

const notifsContainer = document.querySelector(".notifications-container");

//Loop through all notifications
notifData.notifications.forEach(notif =>{
    const notifContainer = createNotifContainer();
    
    //Create top-level elements within each notification
    const avatar = createAvatar(notif.avatar);
    notifContainer.appendChild(avatar);

    const contentContainer = createContentContainer(notif);
    notifContainer.appendChild(contentContainer);

    if(notif.event.event === "commented your picture"){
        const imgElement = createImgElement(notif.event.picture);
            notifContainer.appendChild(imgElement);
    }          
    else if(notif.read === false){
        notifContainer.classList.add("unread");
    }
    notifsContainer.appendChild(notifContainer);
});

function createNotifContainer(){
    const notifContainer = document.createElement("div");
    notifContainer.classList.add("notification-container");
    return notifContainer;
}
function createAvatar(url){
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = "./assets/images" + url;
    avatar.setAttribute("width", "48px");
    avatar.setAttribute("height", "48px");
    return avatar
}
function createContentContainer(notif){
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");
    
    const notifText = createNotifText(notif);
    const timeSinceEventOccured = createTimeSinceEventOccured(notif); 

    contentContainer.appendChild(notifText);
    contentContainer.appendChild(timeSinceEventOccured);

    if (notif.event.event === "private message") {
        const message = createMessage(notif.event.message);
        contentContainer.appendChild(message);
    }

    return contentContainer;
}
function createNotifText(notif){
    const eventText = createEventText(notif);
    return eventText;
}
function createEventText(notif){
    const eventTextContainer = document.createElement("div");
    eventTextContainer.classList.add("event-text-container");

    const nameSpan = createNameSpan(notif.name);
    eventTextContainer.appendChild(nameSpan);

    let eventSpan;
    let postOrGroup;
    
    switch (notif.event.event) {
        case "react recent post":
            eventSpan = createEventSpan();
            eventSpan.textContent = " reacted to your recent post ";
            eventTextContainer.appendChild(eventSpan);
        
            postOrGroup = createPostSpan();
            postOrGroup.textContent = notif.event.post;
            eventTextContainer.appendChild(postOrGroup)

            break;
        case "follow":
            eventSpan = createEventSpan();
            eventSpan.textContent = " followed you";
            eventTextContainer.appendChild(eventSpan);
            break;
        case "joined group":
            eventSpan = createEventSpan();
            eventSpan.textContent = " has joined your group ";
            eventTextContainer.appendChild(eventSpan);

            postOrGroup = createGroupSpan();
            postOrGroup.textContent = notif.event.group;
            eventTextContainer.appendChild(postOrGroup)
            break;
        case "left group":
            eventSpan = createEventSpan();
            eventSpan.textContent = " left the group ";
            eventTextContainer.appendChild(eventSpan);
            
            postOrGroup = createGroupSpan();
            postOrGroup.textContent = notif.event.group;
            eventTextContainer.appendChild(postOrGroup)
            break;
        case "private message":
            eventSpan = createEventSpan();
            eventSpan.textContent = " sent you a private message";
            eventTextContainer.appendChild(eventSpan);
            break;
        case "commented your picture":
            eventSpan = createEventSpan();
            eventSpan.textContent = " commented on your picture";
            eventTextContainer.appendChild(eventSpan);
            break;
        default:
            break;
    }

    if(notif.read === false){
        const readIcon = createReadIcon();
        eventTextContainer.appendChild(readIcon);
    }
    return eventTextContainer;
}
function createNameSpan(name){
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("name");
    nameSpan.textContent = name;
    return nameSpan;
}
function createEventSpan(){
    const eventSpan = document.createElement("span");
    eventSpan.classList.add("event-text");

    return eventSpan;
}
function createPostSpan(){
    const postSpan = document.createElement("span");
    postSpan.classList.add("post");

    return postSpan;
}
function createGroupSpan(){
    const groupSpan = document.createElement("span");
    groupSpan.classList.add("group");

    return groupSpan;
}
function createReadIcon(){
    const readIcon = document.createElement("span");
    readIcon.classList.add("read-icon");
    readIcon.textContent = "";
    return readIcon
}
function createTimeSinceEventOccured(notif){
    const time = document.createElement("div");
    time.classList.add("time");
    
    let timeArr = notif.timeSinceEventOccured.split(" ");

    switch (timeArr[1]) {
        case "mins":
            let minText = "mins"
            if(timeArr[0] === "1"){
                minText = "min";
            }
            time.textContent = timeArr[0] + minText + " ago";
            break;
        case "days":
            let dayText = "days"
            if(timeArr[0] === "1"){
                dayText = "day";
            }
            time.textContent = timeArr[0] + dayText + " ago";
            break;
        case "weeks":
            let weekText = "weeks"
            if(timeArr[0] === "1"){
                weekText = "week";
            }
            time.textContent = timeArr[0] + weekText + " ago";
            break;
        case "months":
            let monthText = "months"
            if(timeArr[0] === "1"){
                minText = "month";
            }
            time.textContent = timeArr[0] + monthText + " ago";
            break;
        case "years":
            let yearText = "years"
            if(timeArr[0] === "1"){
                minText = "year";
            }
            time.textContent = timeArr[0] + yearText + " ago";
            break;
        default:
            break;
    }

    return time;
}
function createMessage(message){
    const messageText = document.createElement("div");
    messageText.classList.add("message");
    messageText.textContent = message;
    return messageText;
}
function createImgElement(url){
    const imgElement = document.createElement("img");
    imgElement.src = "./assets/images" + url;
    imgElement.classList.add("commented-picture");
    console.log(url)
    return imgElement;
}