import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

const ModalContainer = () => {
    const { modalStore } = useStore();

    return (
        <Modal
            open={modalStore.modal.open}
            onClose={modalStore.closeModal}
            style={{ paddingTop: 15 }}
            size="small"
        >
            <Modal.Content>{modalStore.modal.body}</Modal.Content>
        </Modal>
    );
};

export default observer(ModalContainer);
