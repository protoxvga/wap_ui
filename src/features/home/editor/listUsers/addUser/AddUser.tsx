import { useEffect } from "react";

import { Modal, useMantineTheme, TextInput, Container, Select, Text, Button, Group, Title } from "@mantine/core";

import { AiOutlineUserAdd } from "react-icons/ai";

import { addUserForm } from "./utils/addUserForm";

import { useCreateUserMutation } from "store/api/usersAPI";

import { emailInUseNotification } from "components/notifications/errors";
import { userCreatedNotification } from "components/notifications/success";

interface Props {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    refetch: any;
}

const AddUser: React.FC<Props> = ({opened, setOpened, refetch}) => {
    const [createUser, result] = useCreateUserMutation<any>();
    const theme = useMantineTheme();
    const form = addUserForm();

    useEffect(() => {
        if (result.isError) {
            if (result.error.status === 400)
                emailInUseNotification();
            setOpened(false);
        } else if (result.isSuccess) {
            userCreatedNotification();
            setOpened(false);
            refetch();
        }
    }, [result])

    return (
        <Modal
            centered
            opened={opened}
            onClose={() => (setOpened(false), form.reset())}
            size={"xl"}
            title={<Title size={"h5"}>Add a user</Title>}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            radius={10}
        >
            <Container style={{width: "90%"}} mt={-20} p={20}>
                <form onSubmit={form.onSubmit((values) => createUser(values))}>
                    <Group position="apart" grow>
                        <TextInput required label="First name" placeholder="Paul" mt={20} {...form.getInputProps('firstname', { type: 'input' })} />
                        <TextInput required label="Last name" placeholder="Dubois" mt={20} {...form.getInputProps('lastname', { type: 'input' })} />
                    </Group>
                    <TextInput required label="Email" placeholder="example@example.fr" mt={20} {...form.getInputProps('email', { type: 'input' })} />
                    <Select
                        searchable
                        clearable
                        required
                        data={['User', 'Maintener', 'Editor', 'Admin']}
                        label="Role"
                        radius={"sm"}
                        withAsterisk
                        mt={20}
                        {...form.getInputProps('role', { type: 'input' })}
                    />
                    <Group position="center" mt={30}>
                        <Text size={14} fs="italic" mt={5}>A mail will be sent to the user with his credentials</Text>
                        <Button fullWidth maw={400} color={"violet"} leftIcon={<AiOutlineUserAdd size={20} />} variant="outline" type="submit">
                            Add user
                        </Button>
                    </Group>
                </form>
            </Container>
        </Modal>
    );
}

export default AddUser;