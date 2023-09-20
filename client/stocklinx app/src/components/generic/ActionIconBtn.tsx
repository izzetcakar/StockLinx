import { useState } from 'react'
import "./generic.scss";

interface ActionIconBtnProps {
    submitFunc: () => void;
    icon: string;
}
const ActionIconBtn: React.FC<ActionIconBtnProps> = ({ submitFunc, icon }) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        submitFunc();
        setClicked(true);
        setTimeout(() => setClicked(false), 100); // Reset the clicked state after 100ms
    };
    return (
        <button type='submit' className={clicked ? 'action-btn clicked' : 'action-btn'} onClick={handleClick}>
            <img className='action-btn-icon' src={icon}></img>
        </button>
    )
}

export default ActionIconBtn
