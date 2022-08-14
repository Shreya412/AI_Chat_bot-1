const getUI = async ()=>{
    try
    {
        data = await fetch("http://127.0.0.1:8000/AIC/api/chat_assistant/ui/?api=uooY3q13.2RtUR0XakPZbgeoGQEpreBSfNEwv8Fjt",
            {
                mode: 'cors',
                headers: {'Access-Control-Allow-Origin':"*"}
            }
        )
        data = await data.text()
        document.getElementById("AIC_Chat_Assistant").innerHTML = data;
            
    }
    catch(e)
    {
        console.log(e)
    }
}

getUI();