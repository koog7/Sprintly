import React, { useState } from "react";
import { Modal, Input, Button, CloseButton } from "@mantine/core";

interface JoinProjectModalProps {
    opened: boolean;
    onClose: () => void;
}

const JoinProjectModal: React.FC<JoinProjectModalProps> = ({ opened, onClose }) => {
    const [value, setValue] = useState("");

    return (
        <Modal opened={opened} onClose={onClose} title="Вступление по коду" centered>
            <Input
                placeholder="Код приглашения"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                mt="md"
                rightSection={
                    <CloseButton
                        aria-label="Clear input"
                        onClick={() => setValue("")}
                        style={{ display: value ? undefined : "none" }}
                    />
                }
            />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <Button variant="filled" color="lime" onClick={() => console.log(value)}>
                    Вступить
                </Button>
            </div>
        </Modal>
    );
};

export default JoinProjectModal;
