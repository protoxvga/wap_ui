import { useEffect, useState } from "react";

import { Modal, useMantineTheme, Container, Group, TextInput, Button, PasswordInput, Switch, Title } from "@mantine/core";

import { IoSaveOutline } from "react-icons/io5";

import { editUserForm } from "./utils/configForm";

import { useEditConfigMutation } from "store/api/configAPI";

import { inputLabel, inputDescription } from "./utils/transformData";
import { configNotification } from "components/notifications/success";

interface SingleConfig {
    id: number;
    name: string;
    value: string;
    createdAt: string;
    updatedAt: string;
}

interface ActualConfig {
    Default_Password: SingleConfig;
    Hostname: SingleConfig;
    SMTP_Host: SingleConfig;
    SMTP_Password: SingleConfig;
    SMTP_Port: SingleConfig;
    SMTP_User: SingleConfig;
    UnderMaintenance: SingleConfig;
}

interface Props {
    opened: boolean;
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
    actualConfig: ActualConfig;
    refetch: any;
}

const ConfigModal: React.FC<Props> = ({opened, setOpened, actualConfig, refetch}) => {
    const theme = useMantineTheme();
    
    const arrayOfObjects = Object.values(actualConfig);
    const form = editUserForm({arrayOfObjects});
    
    const isUnderMaintenance = actualConfig.UnderMaintenance.value;
    const [checked, setChecked] = useState(isUnderMaintenance === "true" ? true : false);

    const [newConfig, result] = useEditConfigMutation<any>();

    useEffect(() => {
        if (result.isSuccess) {
            configNotification();
        }
    }, [result])

    const editConfig = (values: any) => {
        newConfig({smtphost: values.SMTP_HOST, smtpuser: values.SMTP_USER, smtpport: values.SMTP_PORT, smtppassword: values.SMTP_PASSWORD, hostname: values.HOSTNAME, defaultPassword: values.DEFAULT_PASSWORD, underMaintenance: checked.toString()});
        refetch();
        setOpened(false);
    }

    return (
        <Modal
            centered
            opened={opened}
            onClose={() => (setOpened(false), form.reset())}
            size={"80%"}
            title={<Title size={"h5"}>Wap Config</Title>}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            radius={10}
            transitionDuration={0}
            overflow="inside"
        >
            <Container style={{width: "90%"}} mt={-20} p={20}>
                <form onSubmit={form.onSubmit((values) => editConfig(values))}>
                    {arrayOfObjects.map((config) => {
                        return (
                            <div key={config.id}>
                                {config.name === "SMTP_PASSWORD" || config.name === "DEFAULT_PASSWORD"
                                    ? <PasswordInput description={inputDescription[config.name]} label={inputLabel[config.name]} mt={10} {...form.getInputProps(config.name, { type: 'input' })} />
                                    : config.name === "USING_CUSTOM_GENERATOR"
                                    ? <></>
                                    : config.name === "UNDER_MAINTENANCE"
                                    ? <Switch checked={checked} color="red" description={inputDescription[config.name]} label={inputLabel[config.name]} mt={30} size={"md"} onLabel="ON" offLabel="OFF" onChange={(event) => setChecked(event.currentTarget.checked)} />
                                    : <TextInput required description={inputDescription[config.name]} label={inputLabel[config.name]} mt={10} {...form.getInputProps(config.name, { type: 'input' })} />
                                }
                            </div>
                        );
                    })}
                    <Group position="center" mt={30} grow>
                        <Button disabled={!form.isDirty()} color={"violet"} leftIcon={<IoSaveOutline size={20} />} miw={240} maw={400} variant="outline" type="submit">
                            Save
                        </Button>
                    </Group>
                </form>
            </Container>
        </Modal>
    );
}

export default ConfigModal;