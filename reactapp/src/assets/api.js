const apiURL = import.meta.env.DEV ? "http://localhost:5000" : "../p8api";
//const apiURL = "https://student11.cs3660.xyz/p8api";
import { addAuthHeader } from "./auth";


    
export async function apiJSON(subpage)
{
    var headers = addAuthHeader({});
    const url= apiURL+subpage;
    var response = await fetch(url, headers);
    var result = await response.json();
    return result;
}
export async function api(link, data, method) 
{
	if (!method) method = data? "POST" : "GET";
	var headers = {method:method};
	if (data) headers["body"] = data;
    headers = addAuthHeader(headers);
	var response = await (await fetch(apiURL + "/" + link, headers)).text();
    //console.log(response);
	return response;
} 
export function apiFilename(dir, prefix, id, ext)
{
    return `${apiURL}/static/images/${dir}/${prefix}${id}.${ext}`;
}
function clearForm(form)
{
    document.querySelectorAll("input, select, textarea").forEach(
        element =>{element.value = "";}
    )
}
export async function add(event, add_target)
{
    event.preventDefault();
    var form = event.target; //prevent reload
    var headers = {"method": "POST", "body": new FormData(form)};
    headers = addAuthHeader(headers);
    form.disabled = true;
    var response;
    var url;
    try
    {
        if(add_target == "/professionals_add")
        {
            url = apiURL + add_target;
            response = await (await fetch(url, headers)).text(); 
            if(response == "ok"){clearForm(event.target)}
            else{alertUser(response);}
            return response;
        }
        else if(add_target == "/services")
        {
            url = apiURL + add_target;
            var response = await (await fetch(url, headers)).text(); 
            if(response == "ok"){clearForm(event.target)}
            else{alertUser(response);}
            return response;
        }
        else if(add_target == "/services_add_category")
        {
            url = apiURL + add_target;
            var response = await (await fetch(url, headers)).text(); 
            if(response == "ok"){clearForm(event.target)}
            else{alertUser(response);}
            return response;
        }
        else
        {
            return ""
        }
    }
    catch(error)
    {
        alert("Unexpected error: " + error.message);
    }
   
    form.disabled = false;
}

export async function apiSubmit(event, endpoint, method="POST", formdata) 
{
    event.preventDefault();
    var form = event.target;
    if(!formdata) formdata = new FormData(form);
    var headers = {"method":method,"body": formdata};
    headers = addAuthHeader(headers);
    //console.log(headers);
	form.disabled = true;
    var response = await (await fetch(`${apiURL}/${endpoint}`, headers)).text();
	form.disabled = false;
    clearForm(event.target);
	return response;
}
export async function apiForm(event, link, method="POST") 
{
	event.preventDefault();
	event.target.disabled=true;
	var response = await api(link, new FormData(event.target), method);
	event.target.disabled=false;
	if (response=="ok") clearForm(event.target);
	else alertmessage(response);
	return response;
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
export async function database_command(command) 
{
    let result = confirm('Are you sure?');
    var headers = addAuthHeader({});
    if(result)
    {
        let items = document.getElementsByClassName("adminItem");
        for (let item of items)
        {
            item.disabled = true;
        }
        var response;
        var url;
        if(command == "backup")
        {
            url = apiURL+ "/data_backup";
            try{response = await (await fetch(url, headers)).text();}
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
            url = apiURL + "/data_restore"
            try{response = await (await fetch(url, headers)).text(); console.log("Response: ");}
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
