import { FC, memo } from "react";
import styles from "./UserProfile.module.css";
import Button from "src/components/UI/Button";
import { useAppDispatch } from "src/hooks/redux.hook";
import { authLogout } from "src/store/actions/AuthAction";
import messageQueueAction from "src/store/actions/MessageQueueAction";

const UserProfile: FC<any> = () => {
    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch(authLogout(() => {
            dispatch(messageQueueAction.addMessage(null, "dark", "Вы вышли из аккаунта"));
        }));
    }

    return (
        <>
            <div>
                <Button
                    title={"Выйти из аккаунта"}
                    clickHandler={onLogout} />
            </div>
        </>
    );
};

export default memo(UserProfile);
