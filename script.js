document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve form values
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var age = document.getElementById('age').value.trim();
    var fatherName = document.getElementById('father_name').value.trim();
    var program = document.getElementById('program').value.trim();
    var branch = document.getElementById('branch').value.trim();
    var studentId = document.getElementById('student_id').value.trim();
    var sslcRegNo = document.getElementById('sslc_reg_no').value.trim();
    var photo = document.getElementById('photo').files[0];

    // Validate form inputs
    if (!validateForm(name, email, age, fatherName, program, branch, studentId, sslcRegNo, photo)) {
        return; // Exit if validation fails
    }

    // Create a unique ID for each student record
    var id = new Date().getTime().toString();

    // Create student object
    var student = {
        id: id,
        name: name,
        email: email,
        age: age,
        fatherName: fatherName,
        program: program,
        branch: branch,
        studentId: studentId,
        sslcRegNo: sslcRegNo
    };

    // Store student data in local storage
    localStorage.setItem(id, JSON.stringify(student));

    // Store photo in local storage
    storePhoto(id, photo);

    // Reset form fields
    document.getElementById('registration-form').reset();

    // Display success message
    alert('Student registered successfully!');
});

function validateForm(name, email, age, fatherName, program, branch, studentId, sslcRegNo, photo) {
    if (name === '' || email === '' || age === '' || fatherName === '' || program === '' || branch === '' || studentId === '' || sslcRegNo === '' || !photo) {
        alert('Please fill out all fields.');
        return false; // Validation failed
    }

    if (isNaN(age) || age <= 0) {
        alert('Please enter a valid age (only positive numbers are allowed).');
        return false; // Validation failed
    }

    if (photo.size > 2 * 1024 * 1024) {
        alert('Please upload a photo less than 2MB in size.');
        return false; // Validation failed
    }

    return true; // Validation passed
}

function storePhoto(id, photo) {
    var reader = new FileReader();
    reader.onload = function(event) {
        localStorage.setItem(id + '_photo', event.target.result);
    };
    reader.readAsDataURL(photo);
}
