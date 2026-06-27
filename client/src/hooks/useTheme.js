import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setTheme } from '../redux/uiSlice';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setAppTheme = (newTheme) => {
    dispatch(setTheme(newTheme));
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggle,
    setTheme: setAppTheme,
  };
};

export default useTheme;
