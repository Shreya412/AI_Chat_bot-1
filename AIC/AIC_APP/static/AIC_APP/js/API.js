$(document).ready(function () {
    $(document).on("click",".clipboard",(e)=>{
        $(e.target).removeClass("fa-paste");
        $(e.target).addClass("fa-clipboard-check");
        navigator.clipboard.writeText($(e.target).attr("name"));
    })
    $(document).on("mouseout",".clipboard",(e)=>{
        $(e.target).removeClass("fa-clipboard-check");
        $(e.target).addClass("fa-paste");
        navigator.clipboard.writeText($(e.target).attr("name"));
    })

    const loadAPIs = ()=>{
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/AIC/me/api/keys/",
            success: function (response) {
                response.map((key,i)=>{
                    $("#APIkeys").append(`<tr>
                                            <th scope="row">${i+1}</th>
                                            <td>${key['api_key']}</td>
                                            <td><i class="fa-regular fa-paste fs-4 text-primary clipboard" name="${key['api_key']}"></i></td>
                                            <td>${key['name']}</td>
                                            <td>${key['active']?"Active":"Deactive"}</td>
                                            <td class="text-center deleteAPI" name="${key['api_key']}"><i class="fa-solid fa-trash-can fs-4" name="${key['api_key']}"></i></td>
                                            <td class="text-center manageAPI" data-bs-toggle="modal" data-bs-target="#editAPI" name="${key['api_key']}"><i class="fa-solid fa-pen-to-square fs-4" data-bs-toggle="modal" data-bs-target="#editAPI" name="${key['api_key']}"></i></td>
                                        </tr>`)
                })
            },
            error:(e)=>{
                $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-danger">Error</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>${e.responseJSON}</p>
                                            </div>
                                        </div>`);
            }
        });
    }
    loadAPIs();

    $("#generateAPIKey").on("click",async ()=>{
        await $.ajax({
            type: "POST",
            url: `http://localhost:8000/AIC/me/api/keys/`,
            success: function (response) {
                $("#APIkeys").html("");
                loadAPIs();
                res = response;

                $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-success">Success</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>${response.message}</p>
                                            </div>
                                        </div>`);

            },
            error:(e)=>{
                $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-danger">Error</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>${e.responseJSON}</p>
                                            </div>
                                        </div>`);
            }
        });
    })

    const getSingleKey = async (api)=>{
        let res;
        try
        {
            await $.ajax({
                type: "GET",
                url: `http://localhost:8000/AIC/me/api/keys/${api}`,
                success: function (response) {
                    res = response;
                },
                error:()=>{
                    alert("Error");
                }
            });
        }
        catch(e)
        {
            console.log(e);
        }
        return res;
    }


    $(document).on("click",".deleteAPI",async (e)=>{
        api = $(e.target).attr("name");
        await $.ajax({
            type: "DELETE",
            url: `http://localhost:8000/AIC/me/api/keys/${api}`,
            success: function (response) {
                $("#APIkeys").html("");
                loadAPIs();
                console.log(response);
                $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-success">Success</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>API Key Deleted Successfully</p>
                                            </div>
                                        </div>`);

            },
            error:(e)=>{
                $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-danger">Error</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>${e.responseJSON.message}</p>
                                            </div>
                                        </div>`);
            }
        });
    })

    $(document).on("click",".manageAPI",async (e)=>{
        api = $(e.target).attr("name");
        console.log(api);
        const response = await getSingleKey(api);
        const apiName = response.message.name;
        const active = response.message.active;
        $("#apiName").val(apiName);
        $("#APIForm").attr("name",api);
        active==1?$("#activeAPI").attr("checked","true"):$("#activeAPI").removeAttr("checked");
        console.log(response);
    })

    $(document).on("submit","#APIForm",(e)=>{
        e.preventDefault();
        try
        {
            api = $(e.target).attr("name");
                $.ajax({
                    type: "PUT",
                    url: `http://localhost:8000/AIC/me/api/keys/${api}`,
                    data:JSON.stringify({
                        "activate":$("#activeAPI").is(":checked")?1:0,
                        "name":$("#apiName").val()
                    }),
                    success: function (response) {
                        $("#APIModelClose").click();
                        $("#APIkeys").html("");
                        loadAPIs();
                        $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-success">Success</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>API Key Updated Successfully</p>
                                            </div>
                                        </div>`);
                    },
                    error:(e)=>{
                        $("#notifications").html(`<div class="toast show">
                                            <div class="toast-header">
                                            <strong class="me-auto text-danger">Error</strong>
                                            <button type="button" class="btn-close alertClose"></button>
                                            </div>
                                            <div class="toast-body">
                                            <p>${e.responseJSON.message}</p>
                                            </div>
                                        </div>`);
                    }
                });
        }
        catch(e)
        {
            console.log(e);
        }
        
    })

    $(document).on("click",".alertClose",(e)=>{
        $(e.target).closest(".toast").fadeOut();
    })
});