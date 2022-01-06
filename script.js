//getting elements
var contacts=[];
var emaildel;
const cp = document.getElementById('confirm');
const yesBtn = document.getElementById('yesbtn');
const noBtn = document.getElementById('nobtn');
const tbody = document.getElementById('tbdy');
const addbtn = document.getElementById('addCont');
const cname = document.getElementById('name');
const cemail = document.getElementById('email');
const okbtn = document.getElementById('ok');
const ok1btn = document.getElementById('ok1');
const eokbtn = document.getElementById('eok');
var up = document.getElementById('popup');
var nm = document.getElementById('popnm');
const wrapper = document.getElementById('wrapper');
const searchCont = document.getElementById('searchContact');
var contRow = document.getElementsByTagName('tbody');
okbtn.addEventListener('click',alertdown);
ok1btn.addEventListener('click',alertdnm);
eokbtn.addEventListener('click',existDown);
const existpop = document.getElementById('existsup');
const nameBtn = document.getElementById('searchBy1');
const emailBtn = document.getElementById('searchBy2');
const contInfo = document.getElementById('contInfo');
var contLength = contInfo.parentNode.children.length;
const patterns = {
    contactName:/^[A-Aa-z]{1,25}$/,
    contactNo : /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
};
var radio=0;    //0 for name and 1 for email
startApp();

emailBtn.addEventListener('change',switch1);
nameBtn.addEventListener('change',switch1);


function switch1(){
    if(radio==0){
        radio=1;
    }
    else
        radio=0;
    console.log(radio);
}
function startApp(){
    nameBtn.checked=true;
    console.log(contacts);
    let tmp = JSON.parse(localStorage.getItem('contacts'));

    if(tmp==null){
        console.log(null);
        return;
    }

    contacts = tmp;


    
    for(var i=0;i<contacts.length;i++){
        createRow(contacts[i].nameNo,contacts[i].emailNo)
    }

}

//hook up event listeners
yesBtn.addEventListener('click',function(){
    wrapper.style.opacity = '1';
    cp.style.display = 'none';
    targetCont.parentElement.removeChild(targetCont);
    for (let i = 0; i < contacts.length; i++) {
    //    console.log(contacts[i].emailNo.cemail)
    console.log(emaildel);
        if(contacts[i].emailNo == emaildel){
            console.log('deleting contact with email',cemail.value);
            contacts.splice(i,1);
    }

    localStorage.setItem('contacts',JSON.stringify(contacts));
    console.log(contacts);
    
    }

    
    //var arr = Array.from(contRow);
});

searchCont.addEventListener('keyup',function(e){
    const term = e.target.value.toLowerCase();
    //console.log(contLength);
    if(radio==0){   //Searching by Name
        var searchValue = e.target.value.toLowerCase();
        var info = contInfo.nextElementSibling; 
        var infoName,infoemail;
        for(i=0;i<contacts.length;i++){
            infoName=info.firstElementChild;
            infoemail=infoName.nextElementSibling;
            infoName=infoName.textContent.toLocaleLowerCase();
            infoemail=infoemail.textContent;
            
            if(infoName.indexOf(searchValue) != -1){
                // Match
                info.style.display='';
            }
            else{
                //NOT Match
                info.style.display='none';
            }
            //console.log(infoemail);
            
            info=info.nextElementSibling;
        }
    }
    else {  //Searching by email
        var searchValue = e.target.value;
        var info = contInfo.nextElementSibling; 
        var infoName,infoemail;
        for(i=0;i<contacts.length;i++){
            infoName=info.firstElementChild;
            infoemail=infoName.nextElementSibling;
            //infoName=infoName.textContent.toLocaleLowerCase();
            infoemail=infoemail.textContent;
            

            
            if(infoemail.indexOf(searchValue) != -1){
                // Match
                
                info.style.display='';
            }
            else{
                
                //NOT Match
                info.style.display='none';
            }
            //console.log(infoemail);
            
            info=info.nextElementSibling;
        }
    }
});

noBtn.addEventListener('click',function(){
    wrapper.style.opacity = '1';
    cp.style.display = 'none'; 
});

addbtn.addEventListener('click',function(e){
    e.preventDefault();
    Validity();
});


//Functions
function  Validity(){


    if(patterns[cemail.name].test(cemail.value) &&  patterns[cname.name].test(cname.value)){
        
        //checking if email Number Already Exists
        if(exists(cemail.value)){
            existUp();
        }
        else{
            //Saving to Array and LocalStorage
            contacts.push({
                nameNo:cname.value,
                emailNo:cemail.value
            })
                
            localStorage.setItem('contacts',JSON.stringify(contacts));
            createRow(cname.value,cemail.value);  
        }

    }
    else{

        if(!patterns[cname.name].test(cname.value))
         alertnm();
        else
         alertup();
    }

}
function createRow(n,p){
    
    const tr1 = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    td1.textContent=n;
    td2.textContent=p;
    td3.textContent="⌫";
    td3.id='delRow';
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    
    tbody.append(tr1);
    contLength++;
    cname.value='';
    cemail.value='';
}
function alertup(){
    wrapper.style.opacity = '0.2';
    up.style.display = 'block';
    console.log(delBtn);
}

function alertnm(){
    wrapper.style.opacity = '0.2';
    nm.style.display = 'block';
    console.log(delBtn);
}

function alertdown(){
    wrapper.style.opacity = '1';
    up.style.display = 'none';    
}

function alertdnm(){
    wrapper.style.opacity = '1';
    nm.style.display = 'none';    
}

Array.from(contRow).forEach(function(roww){
    roww.addEventListener('click',function(e){
        targetCont=e.target.parentElement;
        emaildel=targetCont.children[1];
        emaildel=emaildel.textContent;
        console.log(emaildel);
        if(e.target.id=='delRow'){
            confirmup();
        }
    })
});


function confirmup(){
    wrapper.style.opacity = '0.2';
    cp.style.display = 'block';    
}

function exists(p){
    for (let i = 0; i < contacts.length; i++) {
        if(p==contacts[i].emailNo ){
            return true;
        }        
    }
}

function existUp(){   
    existpop.style.display='block';
    wrapper.style.opacity='0.2';
}
function existDown(){
    existpop.style.display='none';
    wrapper.style.opacity='1';
    
}