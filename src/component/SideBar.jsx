import React, { useState } from 'react';
import styles from './SideBar.module.css';
import Communities from '../home/community/Communities';
import { Modal, Button, Input } from '@mui/material';
import dataCommunity from '../home/community/Community_Data'; // import initial data

export default function SideBar() {
  const [openModal, setOpenModal] = useState(false);
  const [newCommunityName, setNewCommunityName] = useState('');
  const [communityList, setCommunityList] = useState(dataCommunity); // LIFTED STATE

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSaveCommunity = () => {
    const newCommunity = {
      name: newCommunityName,
      pro: "https://img.icons8.com/?size=100&id=x2Lqrp3FigYc&format=png&color=000000", 
      members: "0 Members"
    };

    // Add to top of list
    setCommunityList([newCommunity, ...communityList]);
    setNewCommunityName('');
    setOpenModal(false);
  };

  return (
    <div className={styles.community}>
      <div className={styles.box}>
        <h1 className={styles.commhead}>Community</h1>
        <button className={styles.iconButton} onClick={handleOpenModal}>
          <i className="fa-regular fa-plus"></i>
        </button>
      </div>

      <div className={styles.chats}>
        <Communities communities={communityList} />
      </div>

      <Modal open={openModal} onClose={handleCloseModal}>
        <div className={styles.modalContent}>
          <h2>Add Community</h2>
          <label htmlFor="communityNameInput">
            <input
              type="text"
              id="communityNameInput"
              placeholder="Community Name"
              value={newCommunityName}
              onChange={(e) => setNewCommunityName(e.target.value)}
            />
          </label>
          <br /><br />
          <div className={styles.saveNDcancel}>
            <Button variant="contained" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveCommunity}
              style={{ marginRight: '10px' }}
              disabled={!newCommunityName.trim()}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
