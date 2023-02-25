import { useEffect, useState } from "react";

import { useMantineTheme, ActionIcon, Menu } from "@mantine/core";

import { HiOutlineDotsHorizontal, HiOutlineTrash } from "react-icons/hi";
import { RiEditLine } from "react-icons/ri";
import { TbCheckbox } from "react-icons/tb";

import DodsModal from "./modals/DodsModal";

import { Card } from "types/apiTypes";

import EditModal from "./modals/EditCardModal";
import { useDeleteCardMutation } from "store/api/cardAPI";
import { deleteError2Notification, deleteErrorNotification } from "components/notifications/errors";
import { deleteCardNotification } from "components/notifications/success";

interface Props {
    card: Card;
    refetch: any;
}

const CardMenu: React.FC<Props> = ({ card, refetch }) => {
    const [openDods, setOpenDods] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const theme = useMantineTheme();

    const [deleteCard, resultDelete] = useDeleteCardMutation<any>();

    useEffect(() => {
        if (resultDelete.isError) {
            if (resultDelete.error.status === 403)
                deleteErrorNotification();
            if (resultDelete.error.status === 400)
                deleteError2Notification();
        } else if (resultDelete.isSuccess) {
            deleteCardNotification();
            refetch();
        }
    }, [resultDelete])

    return (
        <>
            <DodsModal openDods={openDods} setOpenDods={setOpenDods} card={card} />
            <EditModal openEdit={openEdit} setOpenEdit={setOpenEdit} card={card} refetch={refetch} />
            <Menu shadow="md" width={200} trigger="hover" openDelay={100} closeDelay={400}>
                <Menu.Target>
                    <ActionIcon size={"lg"} color={"violet"}>
                        <HiOutlineDotsHorizontal size={25} color={theme.colors.violet[5]} />  
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Card</Menu.Label>
                    <Menu.Item icon={<TbCheckbox size={18} />} onClick={() => setOpenDods(true)}>DoDs</Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item disabled={card.status === "WAITING_APPROVAL" || card.status === "REJECTED" ? false : true} onClick={() => setOpenEdit(true)} icon={<RiEditLine size={18} />}>Edit</Menu.Item>
                    <Menu.Item disabled={card.status === "WAITING_APPROVAL" || card.status === "REJECTED" ? false : true} color="red" icon={<HiOutlineTrash size={18} />} onClick={() => deleteCard(card.id)}>Delete card</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}

export default CardMenu;