$(document).ready(function () {
    let categoryTree={};
    $("#categorisationChoiceForm").on("submit",(e)=>{
        e.preventDefault();
        if($("[name = categorisation]:checked").val()=="Yes")
        {
            $(".categorisationChoiceForm").attr("class","categorisationFormSlide");
            setTimeout(()=>{
                $(".categorisationFormSlide").attr("style","display:none"); 
            },500)
        }
    })

    $(document).on("keyup","#categoryName",()=>{
        if($("#categoryName").val()!="")
        {
            $("#categoryName").removeClass("is-invalid");
            $("#categoryName").attr("placeholder","Category Name is Required");
            $("#categoryName").attr("style","border: 1px solid #ced4da !important;");
            $("#categoryNameSubmit").removeClass("btn-outline-danger");
            $("#categoryNameSubmit").addClass("btn-outline-secondary");
        }
        else
        {
            $("#categoryName").addClass("is-invalid");
            $("#categoryNameSubmit").removeClass("btn-outline-secondary");
            $("#categoryName").attr("style","border: 1px solid #dc3545 !important;");
            $("#categoryNameSubmit").addClass("btn-outline-danger");
        }
    })

    $(document).on("keyup",".subCategoryName",(e)=>{
        console.log();
        if($(e.target).val()!="")
        {
            $(e.target).removeClass("is-invalid");
            $(e.target).attr("placeholder","Sub-Category Name is Required");
            $(e.target).attr("style","border: 1px solid #ced4da !important;");
            $($(e.target).parent().children("button")).removeClass("btn-outline-danger");
            $($(e.target).parent().children("button")).addClass("btn-outline-secondary");
        }
        else
        {
            $(e.target).addClass("is-invalid");
            $($(e.target).parent().children("button")).removeClass("btn-outline-secondary");
            $(e.target).attr("style","border: 1px solid #dc3545 !important;");
            $($(e.target).parent().children("button")).addClass("btn-outline-danger");
        }
    })

    $(document).on("submit","#categortNameForm",(e)=>{
        e.preventDefault();
        const categoryName = $("#categoryName").val();
        if(categoryName=="")
        {
            $("#categoryName").addClass("is-invalid");
            $("#categoryName").attr("placeholder","Category Name is Required");
            $("#categoryNameSubmit").removeClass("btn-outline-secondary");
            $("#categoryName").attr("style","border: 1px solid #dc3545 !important;");
            $("#categoryNameSubmit").addClass("btn-outline-danger");
        }
        else
        {
            if(categoryTree[categoryName]==null)
            {
                categoryTree[categoryName]={};
                $("#categoryDisplay").append(`<div class="accordion-item">
                                                <h2 class="accordion-header border d-flex">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${categoryName}">
                                                        ${categoryName}
                                                    </button>
                                                    <button class="btn-close deleteCategory my-auto mx-2 fs-5" name=${categoryName}></button>
                                                </h2>
                                                <div id="${categoryName}" class="accordion-collapse collapse">
                                                    <div class="accordion-body ps-0">
                                                        <div class="categoryInputDisplay">
                                                            <form action="#" class="subCategoryNameForm" name="${categoryName}">
                                                                <div class="input-group my-1">
                                                                    <input type="text" class="form-control subCategoryName" placeholder="Enter Sub-Category Name" style="border: 1px solid #ced4da !important;">
                                                                    <button class="btn btn-outline-secondary" type="submit">Add</button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div class="accordion accordion-flush category" category="${categoryName}">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`);
            }
            else
            {
                $("#categoryName").val("");
                $("#categoryName").addClass("is-invalid");
                $("#categoryName").attr("placeholder","Category Name is Already Exist !!");
                $("#categoryNameSubmit").removeClass("btn-outline-secondary");
                $("#categoryName").attr("style","border: 1px solid #dc3545 !important;");
                $("#categoryNameSubmit").addClass("btn-outline-danger");
            }
        }
    });

    $(document).on("click",".deleteCategory",(e)=>{
        delete categoryTree[e.target.name];
        $(e.target).closest(".accordion-item").fadeOut();
    })

    $(document).on("submit",".subCategoryNameForm",(e)=>{
        e.preventDefault();
        let categoryHierarchy = e.target.name;
        let i = e.target.closest(".category");
        let j=0;
        while($(i).attr("category")!="")
        {
            categoryHierarchy+=">"+$(i).attr("category");
            i = $(i).parent().closest(".category")
            console.log(i);
            j++;
            if(j>5)
                break;
            
        }
        var data = categoryTree;
        let hierarchy = categoryHierarchy.split(">").reverse();
        for(let i in hierarchy)
        {
            console.log("data : ",data)
            data = data[hierarchy[i]]
            console.log(i);
        }
        categoryName = $(e.target)[0].querySelectorAll("input")[0].value;
        if(data[categoryName]==null)
        {
            data[categoryName] = {};
            $(e.target.closest(".accordion-body")).children(".category").append(`<div class="accordion-item">
                                                                                    <h2 class="accordion-header border d-flex">
                                                                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${categoryName}">
                                                                                            ${categoryName}
                                                                                        </button>
                                                                                        <button class="btn-close deleteCategory my-auto mx-2 fs-5" name=${categoryName}></button>
                                                                                    </h2>
                                                                                    <div id="${categoryName}" class="accordion-collapse collapse">
                                                                                        <div class="accordion-body ps-0">
                                                                                            <div class="categoryInputDisplay">
                                                                                                <form action="#" class="subCategoryNameForm" name="${categoryName}">
                                                                                                    <div class="input-group my-1">
                                                                                                        <input type="text" class="form-control subCategoryName" placeholder="Enter Sub-Category Name" style="border: 1px solid #ced4da !important;">
                                                                                                        <button class="btn btn-outline-secondary" type="submit">Add</button>
                                                                                                    </div>
                                                                                                </form>
                                                                                            </div>
                                                                                            <div class="accordion accordion-flush category" category="${categoryName}">
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>`);
        }
        else
        {
            console.log($($(e.target)[0].querySelectorAll("input")[0]));
            $($(e.target)[0].querySelectorAll("input")[0]).val("");
            $($(e.target)[0].querySelectorAll("input")[0]).addClass("is-invalid");
            $($(e.target)[0].querySelectorAll("input")[0]).attr("placeholder","Category Name is Already Exist !!");
            $($(e.target)[0].querySelectorAll("button")[0]).removeClass("btn-outline-secondary");
            $($(e.target)[0].querySelectorAll("input")[0]).attr("style","border: 1px solid #dc3545 !important;");
            $($(e.target)[0].querySelectorAll("button")[0]).addClass("btn-outline-danger");
        }
        console.log(categoryTree);
    })

});