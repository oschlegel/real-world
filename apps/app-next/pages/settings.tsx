import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';
import React from 'react';
import styled from 'styled-components';
import SettingsForm from '../components/settings-form';
import { getUser } from '../services/server/user';
import { getToken } from '../utils/server/token';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = getToken(context);
  const user = await getUser(token);

  return {
    props: {
      user,
    },
  };
};

const StyledSettings = styled.div`
  color: inherit;
`;

export function Settings({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <StyledSettings>
      <div className="settings-page">
        <div className="container page">
          <SettingsForm user={user} />
        </div>
      </div>
    </StyledSettings>
  );
}

export default Settings;
