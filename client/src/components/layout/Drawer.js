/***
 * This function is not used in current version of Researchify.
 * Components need to be modified to Bootstrap in next sprint.
 */
function Drawer() {
    return (
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Researchify</span>
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="/dashboard">Dashboard</a>
                <a class="mdl-navigation__link" href="/dashboard/profile">Profile</a>
                <a class="mdl-navigation__link" href="/publications/team/:teamId">Publication Team</a>
                <a class="mdl-navigation__link" href="/publications/:pubId">Publications</a>
                <a class="mdl-navigation__link" >Contact US</a>
                <a class="mdl-navigation__link" >About US</a>
                <a class="mdl-navigation__link" >Setting</a>
                <a class="mdl-navigation__link" >Help</a>
                <a class="mdl-navigation__link" >Send Feedback</a>
            </nav>
        </div>
    )
}

export default Drawer