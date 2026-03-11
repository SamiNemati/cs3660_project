async function add(event, add_target)
{
    event.preventDefault();
    var form = event.target; //prevent reload
    var headers = {"method": "POST", "body": new FormData(form)};
    form.disabled = true;
    var response;
    try
    {
        if(add_target == "professional")
        {
            response = await (await fetch("professionals_add", headers)).text(); 
            if(response == "ok"){refresh_professionals();}
            else{alertUser(response);}
        }
        else if(add_target == "service")
        {
            var response = await (await fetch("services_add", headers)).text(); 
            if(response == "ok"){refresh_services();}
            else{alertUser(response);}
        }
        else if(add_target == "category")
        {
            var response = await (await fetch("services_add_category", headers)).text(); 
            if(response == "ok"){refresh_services();}
            else{alertUser(response);}
        }
    }
    catch(error)
    {
        alert("Unexpected error: " + error.message);
    }
   
    form.disabled = false;
}

function alertUser(response)
{
    if(response == "err_missing")
    {
        alert("All fields need to completed.");
    }
    else if (response == "err_filetype")
    {
        alert("Incorrect file types(Allowed filetypes ['.jpg', '.jpeg', '.png', '.gif']");
    }
    else if (response == "err_file")
    {
        alert("Error saving file.");
    }
    else if(response == "err_db")
    {
        alert("Database error");
    }
    else
    {
        alert("Unexpected error: " + response);
    }
}
async function refresh_professionals()
{
    try
    {
        var content = await(await fetch("/professionals_refresh")).text();
        document.querySelector(".devImgContainer").innerHTML = content; 
    }
    catch(error) { alert("Unexpected error: " + error.message); }
    
}
async function refresh_services()
{
    try
    {
        var content = await(await fetch("/services_refresh")).text();
        document.querySelector(".services").innerHTML = content;
    }
    catch(error){ alert("Unxpected error: " + error.message);}
}

async function database_command(command) 
{
    let result = confirm('Are you sure?');
    if(result)
    {
        let items = document.getElementsByClassName("adminItem");
        for (let item of items)
        {
            item.disabled = true;
        }
        var response;
        if(command == "backup")
        {
            try{response = await (await fetch("/data_backup")).text();}
            catch(error)
            {
                alert("Unexpected error: " + error.message);
                return;
            }
            if(response == "ok")
            {
                document.getElementById("adminAlert").innerHTML = "<p style = 'text-align: center; background-color: white;'>Database backed up sucessfully</p>";
            }
            else
            {
                document.getElementById("adminAlert").innerHTML = "<p style = 'text-align: center; background-color: red;'>Database back up failed.</p>";
            }
        }
        else
        {
            try{response = await (await fetch("/data_restore")).text();}
            catch(error)
            {
                alert("Unexpected error: " + error.message);
                return;
            }
            if(response == "ok")
            {
                document.getElementById("adminAlert").innerHTML = "<p style = 'text-align: center; background-color: white;'>Database restored sucessfully</p>";
            }
            else
            {
                document.getElementById("adminAlert").innerHTML = "<p style = 'text-align: center; background-color: red;'>Database restore failed.</p>";
            }
        }
        for ( let item of items)
        {
            item.disabled = false;
        }
    }
}

