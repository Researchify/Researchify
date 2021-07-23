/**
 * Root component.
 */
import { Switch, Redirect } from 'react-router-dom';

// Pages 
import Dashboard from '../dashboard/Dashboard';
import ProfileInfoEdit from '../profileInfoEdit/ProfileInfoEdit';
import PublicationPage from '../publications/PublicationPage';
import EditorHome from '../editor/EditorHome';
import TeamPage from '../teamPage/TeamPage';

// Layout
import DashboardLayoutRoute from '../layouts/dashboardLayout/DashboardLayoutRoute';
import EditorLayoutRoute from '../layouts/editorLayout/EditorLayoutRoute';

const PrivateRoute = () => {
    return (
        <Switch>
          <DashboardLayoutRoute path="/dashboard" exact component={Dashboard} />
          <DashboardLayoutRoute
            path="/dashboard/profile"
            exact
            component={ProfileInfoEdit}
          />
          <DashboardLayoutRoute
            path={`/publications`}
            exact
            component={PublicationPage}
          />
          <DashboardLayoutRoute path="/team" exact component={TeamPage} />
          <EditorLayoutRoute path="/editor" exact component={EditorHome} />
          <EditorLayoutRoute path="/editor/home" exact component={EditorHome} />
          <Redirect to="/dashboard"/>
        </Switch>
    );
  };

export default PrivateRoute