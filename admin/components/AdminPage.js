import React from 'react'
import { Title, Tabs } from '@mantine/core';
import styles from './AdminPage.module.css'
import Resource from './Resource'
import Email from './Email'
import Sponsors from './Sponsors'

const AdminPage = () => {
  return <main className={styles.main}>
    <Title order={1} mb="md">Admin Page</Title>

    <Tabs defaultValue="resource">
      <Tabs.List mb="md">
        <Tabs.Tab value="resource">Add resource</Tabs.Tab>
        <Tabs.Tab value="email">E-Mail</Tabs.Tab>
        {/* <Tabs.Tab value="sponsor">Sponsors</Tabs.Tab> */}
      </Tabs.List>

      <Tabs.Panel value="resource"><Resource /></Tabs.Panel>
      <Tabs.Panel value="email"><Email /></Tabs.Panel>
      {/* <Tabs.Panel value="sponsors"><Sponsors /></Tabs.Panel> */}
    </Tabs>
  </main>
}

export default AdminPage
