import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { githubLoginUrl } from '../../config/deploy';
import { GoMarkGithub } from 'react-icons/go';
import { getGHAccessToken } from '../../actions/team';

const DeployPage = () => {
  const dispatch = useDispatch();
    const teamId = useSelector((state) => state.team.teamId);
    const [accessToken, setAccessToken] = useState(false);

  useEffect(() => {
    // github returns a code in the url after user logs in
    const url = window.location.href;
    const hasCode = url.includes('?code=');
    // TODO: something is making this render twice without the extra condition

    if (hasCode && !accessToken) {
      const code = url.split('?code=')[1];
      // we use this code to exchange an access token
        console.log(code);
        dispatch(getGHAccessToken(teamId, code));
        setAccessToken(true);
    }
  });

  return (
    <a href={githubLoginUrl}>
      <GoMarkGithub />
      <span>Login with GitHub</span>
    </a>
  );
};

export default DeployPage;
