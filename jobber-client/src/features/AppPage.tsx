import { FC, ReactElement, useCallback, useEffect, useState } from 'react'
import Index from './index';
import { useAppDispatch, useAppSelector } from 'src/store/store';
import { IReduxState } from 'src/store/store.interface';
import { useCheckCurrentUserQuery } from './auth/services/auth.service';
import { addAuthUser } from './auth/reducers/auth.reducer';
import { applicationLogout, saveToSessionStorage } from 'src/shared/utils/utils.service';
import HomeHeader from 'src/shared/header/components/HomeHeader';
import { Home } from './home/Home';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useGetCurrentBuyerByUsernameQuery } from './buyer/services/buyer.service';
import { addBuyer } from './buyer/reducers/buyer.reducer';

export const AppPage: FC = (): ReactElement => {

  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const appLogout = useAppSelector((state: IReduxState) => state.logout);

  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();

  const showCategoryContainer = true;
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const { data: currentUserData, isError } = useCheckCurrentUserQuery();
  const { data: buyerData } = useGetCurrentBuyerByUsernameQuery();

  const checkUser = useCallback(async () => {
    try {
      if (currentUserData && currentUserData.user && !appLogout) {
        setTokenIsValid(true);
        dispatch(addAuthUser({authInfo: currentUserData.user}));
        dispatch(addBuyer(buyerData?.buyer))

        saveToSessionStorage(JSON.stringify(true), JSON.stringify(authUser.username));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentUserData, dispatch, appLogout, authUser.username, buyerData]);

  const logoutUser = useCallback(async () => {

    if ((!currentUserData && appLogout) || isError) {
      setTokenIsValid(false);
      applicationLogout(dispatch, navigate);
    }

  }, [currentUserData, dispatch, navigate, appLogout, isError]);

  useEffect(() => {
    checkUser();
    logoutUser();
  }, [checkUser, logoutUser]);

  if (authUser) {
    return !tokenIsValid && !authUser.id ? (
      <Index/>
    ) : (
      <>
        <HomeHeader showCategoryContainer={showCategoryContainer}/>
        <Home/>
      </>
    );
  } else {
    return <Index/>
  }
}

export default AppPage;

