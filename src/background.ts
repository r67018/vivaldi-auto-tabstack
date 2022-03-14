import { v4 as uuidv4 } from 'uuid'
import {
  VivaldiTab,
  VivaldiUpdateProperties,
  chromeTabsUpdatePromise,
  chromeTabsGetPromise,
  isVivaldiTab,
  getGroup,
  hasGroup,
  groupTabs
} from './tab'

chrome.tabs.onCreated.addListener(async (tab: any) => {
  if (!isVivaldiTab(tab)) return
  if (!tab.openerTabId) return

  console.log('getting opener tab...')
  const openerTab: VivaldiTab = await chromeTabsGetPromise(tab.openerTabId) as VivaldiTab
  const targetTabs: VivaldiTab[] = [tab]
  let groupId: string
  if (!hasGroup(openerTab)) {
    console.log('opener tab does not belong group')
    targetTabs.push(openerTab)
    groupId = uuidv4()
  } else {
    console.log('opener tab already belongs group')
    groupId = getGroup(openerTab)
  }
  console.log('grouping tabs to', groupId)
  const groupedTabs = groupTabs(targetTabs, groupId)
  groupedTabs.forEach((tab) => {
    const data: VivaldiUpdateProperties = { extData: tab.extData }
    chromeTabsUpdatePromise(Number(tab.id), data)
  })
})
