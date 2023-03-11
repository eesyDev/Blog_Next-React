import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../../redux/slices/themeSlice';

function ModeToggle() {
  const { mode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    dispatch(setMode(newMode));
  };

  return (
    <div className="toggle-wrapper">
            <label className="toggle-control" >
            <input type="checkbox" onClick={toggleTheme} />
            <span className="control"></span>
        </label>      
    </div>
  );
}

export default ModeToggle;
