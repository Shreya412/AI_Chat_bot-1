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
            console.log(categoryTree[categoryName]);
            if(categoryTree[categoryName]==null)
            {
                categoryTree[categoryName]={};
                console.log(categoryTree);
                loadCategory();
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
        loadCategory();
    })

    $(document).on("submit",".subCategoryNameForm",(e)=>{
        // e.preventDefault();
        categoryHierarchy = e.target.name;
        let i = e.target.closest(".category");
        console.log(i,categoryHierarchy);
        // while(i!="")
        // {
        //     console.log(i);
        //     categoryHierarchy+=">"+$(i).attr("category");
        //     i = i.closest(".category")
            
        // }
        console.log(categoryHierarchy);
        let categoryData=e.target.closest(".category");

        console.log(categoryData);
        // categoryTree[e.target.name].push(cate)
    })

    const loadCategory = ()=>{
        let categoryData=[];
        for(let categoryName in categoryTree)
        {
            categoryData+=`<div class="accordion-item">
                                <h2 class="accordion-header border d-flex">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${categoryName}">
                                        ${categoryName}
                                    </button>
                                    <button class="btn-close deleteCategory my-auto mx-2 fs-5" name=${categoryName}></button>
                                </h2>
                                <div id="${categoryName}" class="accordion-collapse collapse">
                                    <div class="accordion-body">
                                        <div class="categoryInputDisplay">
                                            <form action="#" class="subCategoryNameForm" name="${categoryName}">
                                                <div class="input-group my-1">
                                                    <input type="text" class="form-control" placeholder="Enter Sub-Category Name" style="border: 1px solid #ced4da !important;" id="${categoryName}">
                                                    <button class="btn btn-outline-secondary" type="submit">Add</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="accordion accordion-flush category" category="${categoryName}">
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        }
        $("#categoryDisplay").html(categoryData);
    }

});