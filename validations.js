var branch, gender, fname, lname, email, dob, flag = 0, arrayOfDetails = [], index = 0, updateIndex = false, updateRowIndex;
let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
document.getElementById("dob").setAttribute("max", today);

function getRegistrationDetails() {
    hideErrorMsg()
    flag = 0;
    fname = document.getElementById('fname').value;
    lname = document.getElementById('lname').value;
    email = document.getElementById('email').value;
    dob = document.getElementById('dob').value;

    isValidDetails();
    isValideDob();
    isValidGender();
    isValidBranch();
    if (flag == 0) {
        insertIntoTable();
    }
    document.getElementById('fname').value = null;
    document.getElementById('lname').value = null;
    document.getElementById('email').value = null;
    document.getElementById('dob').value = null;
    var checked_gender = document.getElementsByName("gender");
    var checked_branch = document.getElementsByName("branch");
    for (var i = 0; i < checked_gender.length; i++) {
        checked_gender[i].checked = false;
    }
    for (var i = 0; i < checked_branch.length; i++) {
        checked_branch[i].checked = false;
    }
}


function isValidDetails() {
    const charPattern = /^[a-zA-Z]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fname || !fname.trim() || !charPattern.test(fname)) {
        document.getElementById('fname_err_msg').innerHTML = "Enter Correct First Name ";
        flag++;
    }

    if (!lname || !lname.trim() || !charPattern.test(lname)) {
        document.getElementById('lname_err_msg').innerHTML = "Enter Correct Last Name ";
        flag++;
    }

    if (!email || !email.trim() || !emailPattern.test(email)) {
        document.getElementById('email_err_msg').innerHTML = "Enter Correct Email ID ";
        flag++;
    }

    if (updateIndex) {
        for (i = 0; i < arrayOfDetails.length; i++) {
            if (i == updateRowIndex - 1) {


            }
            else if (email == arrayOfDetails[i].Email) {
                document.getElementById('email_err_msg').innerHTML = "Email is already Used";
                flag++;
            }
        }
    }
    else {
        for (i = 0; i < arrayOfDetails.length; i++) {
            if (email == arrayOfDetails[i].Email) {
                document.getElementById('email_err_msg').innerHTML = "Email is already Used";
                flag++;
            }
        }
    }


}

function isValideDob() {
    const year = parseInt(dob.slice(0, 4));
    const month = parseInt(dob.slice(5, 7));
    const day = parseInt(dob.slice(8, 10));

    if (!dob) {
        document.getElementById('dob_err_msg').innerHTML = "Please Choose Date of Birth ";
        flag++;
    }
    if (year > yyyy) {
        document.getElementById('dob_err_msg').innerHTML = "Please Enter Valid Date of Birth ";
        flag++;

    }
    else if (month > mm && year > yyyy) {
        document.getElementById('dob_err_msg').innerHTML = "Please Enter Valid Date of Birth ";
        flag++;
    }
    else if (day > dd && month >= mm && year >= yyyy) {
        document.getElementById('dob_err_msg').innerHTML = "Please Enter Valid Date of Birth ";
        flag++;
    }
    else if (day <= dd) {
        if (month > mm) {
            document.getElementById('dob_err_msg').innerHTML = "Please Enter Valid Date of Birth ";
            flag++;
        }

    }
}

function isValidGender() {
    if (!document.getElementById('Male').checked && !document.getElementById('Female').checked) {
        document.getElementById('gender_err_msg').innerHTML = "Please select Gender ";
        flag++;
    }
    else {
        gender = document.querySelector('input[name="gender"]:checked').value;
    }
}

function isValidBranch() {
    if (!document.getElementById('Civil').checked && !document.getElementById('Computer').checked && !document.getElementById('E_TC').checked && !document.getElementById('Mechanical').checked) {
        document.getElementById('branch_err_msg').innerHTML = "Please select Branch ";
        flag++;
    }
    else {
        branch = document.querySelector('input[name="branch"]:checked').value;
    }
}

function hideErrorMsg() {
    document.getElementById('fname_err_msg').innerHTML = " ";
    document.getElementById('lname_err_msg').innerHTML = " ";
    document.getElementById('email_err_msg').innerHTML = " ";
    document.getElementById('dob_err_msg').innerHTML = " ";
    document.getElementById('gender_err_msg').innerHTML = " ";
    document.getElementById('branch_err_msg').innerHTML = " ";

}

function insertIntoTable() {
    if (updateIndex) {
        index = updateRowIndex - 1;
    }
    arrayOfDetails[index] = {
        Fname: fname,
        Lname: lname,
        Email: email,
        Dob: dob,
        Gender: gender,
        Branch: branch
    }


    let table = document.getElementById('table_data');
    let tableRow = document.createElement('tr');

    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Fname);
    tableRow.insertAdjacentElement("beforeend", td);
    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Lname);
    tableRow.insertAdjacentElement("beforeend", td);
    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Email);
    tableRow.insertAdjacentElement("beforeend", td);
    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Dob);
    tableRow.insertAdjacentElement("beforeend", td);
    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Gender);
    tableRow.insertAdjacentElement("beforeend", td);
    var td = document.createElement('td');
    td.insertAdjacentHTML('beforeend', arrayOfDetails[index].Branch);
    tableRow.insertAdjacentElement("beforeend", td);

    var td = document.createElement('input');
    td.setAttribute('type', 'button')
    td.setAttribute('class', 'btn btn-danger del');
    td.setAttribute('value', 'Delete');
    td.addEventListener("click", function () {
        var row_index = this.parentElement.rowIndex;
        table.deleteRow(row_index);
        arrayOfDetails.splice(row_index - 1, 1);
        index = index - 1;
    });
    tableRow.insertAdjacentElement("beforeend", td);

    var td = document.createElement('input');
    td.setAttribute('type', 'button')
    td.setAttribute('class', 'btn btn-warning update');
    td.setAttribute('value', 'Update');
    td.addEventListener("click", function () {
        updateIndex = true;
        updateRowIndex = this.parentElement.rowIndex;
        document.getElementById('fname').value = arrayOfDetails[updateRowIndex - 1].Fname;
        document.getElementById('lname').value = arrayOfDetails[updateRowIndex - 1].Lname;
        document.getElementById('email').value = arrayOfDetails[updateRowIndex - 1].Email;
        document.getElementById('dob').value = arrayOfDetails[updateRowIndex - 1].Dob;
        document.getElementById(arrayOfDetails[updateRowIndex - 1].Branch).checked = true;
        document.getElementById(arrayOfDetails[updateRowIndex - 1].Gender).checked = true;
    });
    tableRow.insertAdjacentElement("beforeend", td);

    if (updateIndex) {
        table.replaceChild(tableRow, table.children[updateRowIndex])
        updateIndex = false;
    }
    else {
        table.appendChild(tableRow)
        index++;
    }
}