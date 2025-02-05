import {IconCirclePlusFilled} from "@tabler/icons-react";
import {Blockquote} from "@mantine/core";

const NoDataMsg = () => {
    return (
        <div>
            <Blockquote color="lime" icon={<IconCirclePlusFilled/>} mt="xl">
                Пока нет данных, но не переживайте! Вы можете создать их прямо сейчас. Просто нажмите на
                кнопку и начните!
            </Blockquote>
        </div>
    );
};

export default NoDataMsg;