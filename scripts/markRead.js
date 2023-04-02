const clickableElement = document.querySelectorAll(".mark-all-as-read, .a-container-name, .a-container-post, .a-container-group, .a-container-message, .a-container-img");
clickableElement.forEach(element =>{
    element.addEventListener("click", () =>{

        const data = JSON.parse(sessionStorage.getItem(("notifData")));

        //If notif count = 0 then then we dont need to do anything!
        if (data.notificationsCount !== 0) {
            
            const id = parseInt(element.getAttribute("data-id"));
            const className = element.className;

            if (className === "mark-all-as-read") {
                //Change notifs count
                data.notificationsCount = 0;
                //Chnage notif read property
                data.notifications.forEach(notif =>{    
                    notif.read = true;
                })
                //Update sessionStorage
                sessionStorage.setItem("notifData",JSON.stringify(data))
                //Reload
                location.reload();
            }
            else if(className === "a-container-name" || className === "a-container-post" || className === "a-container-group" || className === "a-container-message" || className === "a-container-img"){
                
                //Loop to find correct id
                data.notifications.forEach(notif =>{

                    //Check if it has been read
                    if(notif.id === id && notif.read === false){
                        //Update read property and -1 from count
                        notif.read = true;
                        data.notificationsCount -= 1;

                        //Update session storage
                        sessionStorage.setItem("notifData",JSON.stringify(data));
                        //Reload
                        location.reload();
                    }                 
                })
            }           
        }            
    })
})