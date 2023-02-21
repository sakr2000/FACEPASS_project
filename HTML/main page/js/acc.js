account = document.getElementById("account");
password = document.getElementById("password");
displayElement = document.getElementById("displayElement");

account.onclick = function() {
    displayElement.innerHTML =`
    <div class="photo" id="photo">
    <img src="../images/user.png">
        <div>
            <label for="file"> Change Photo</label>
            <input id="file" type="file" accept="image/png, image/jpeg, image/jpg" style="display:none;">
        </div>
    </div>

    <form id="form">
        <div class="name">
            <div class="Fname">
                <label>First Name</label>
                <input type="text">
            </div>

            <div class="Lname">
                <label>Last Name</label>
                <input type="text">
            </div>
        </div>

        <div class="email">
            <label>Email Address</label>
            <input type="email">
        </div>

        <div class="btn">
            <input type="submit" value="Save Changes">
        </div>
    </form>`;
};

password.onclick = function() {
    displayElement.innerHTML = `
    <div class="photo2">
        <img src="../images/password-logo.png">
    </div>
    <div class="password">
        <div class="current">
            <label for="current">Current Password</label>
            <input id="current" type="password">
        </div>
        <div class="new">
            <label for="new">New Password</label>
            <input id="new" type="password">
        </div>
        <div class="confirm">
        <label for="confirm">Confirm Password</label>
            <input id="confirm" type="password">
        </div>
    </div>
        <div class="btn2">
            <button type="submit">Save</button>
        </div>`;
};

