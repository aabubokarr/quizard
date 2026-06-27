import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser, logout, loadCurrentUser, updateProfile, changeAvatar } from '../redux/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (credentials, rememberMe) => {
    const resultAction = await dispatch(loginUser({ credentials, rememberMe }));
    if (loginUser.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error(resultAction.payload || 'Login failed');
    }
  };

  const register = async (userData) => {
    const resultAction = await dispatch(registerUser(userData));
    if (registerUser.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error(resultAction.payload || 'Registration failed');
    }
  };

  const performLogout = () => {
    dispatch(logout());
  };

  const reloadUser = () => {
    dispatch(loadCurrentUser());
  };

  const updateProfileInfo = async (profileData) => {
    const resultAction = await dispatch(updateProfile(profileData));
    if (updateProfile.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error(resultAction.payload || 'Update failed');
    }
  };

  const updateAvatar = async (avatarName) => {
    const resultAction = await dispatch(changeAvatar(avatarName));
    if (changeAvatar.fulfilled.match(resultAction)) {
      return resultAction.payload;
    } else {
      throw new Error(resultAction.payload || 'Failed to change avatar');
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: performLogout,
    reloadUser,
    updateProfileInfo,
    updateAvatar
  };
};

export default useAuth;
