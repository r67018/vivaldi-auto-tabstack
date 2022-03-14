interface VivaldiTab extends chrome.tabs.Tab {
  extData: string
}
interface VivaldiUpdateProperties extends chrome.tabs.UpdateProperties {
  extData?: string
}
interface ExtData {
  group: string
}

type UpdateProperties = chrome.tabs.UpdateProperties | VivaldiUpdateProperties
type UpdatePromise = (tabId: number, data: UpdateProperties) => Promise<any>
type GetPromise = (tabId: number) => Promise<any>

const chromeTabsUpdatePromise: UpdatePromise = (tabId: number, data: UpdateProperties): Promise<any> => (
  new Promise(() => {
    console.log('update tab', tabId)
    chrome.tabs.update(tabId, data)
  })
)

const chromeTabsGetPromise: GetPromise = (tabId: number): Promise<any> => (
  new Promise((resolve) => {
    console.log('get tab', tabId)
    chrome.tabs.get(tabId, resolve)
  })
)

const isVivaldiTab = (obj: any): boolean => {
  return obj && 'extData' in obj
}

const getGroup = (tab: VivaldiTab): string => {
  const extData = JSON.parse(tab.extData)
  return extData.group
}

const hasGroup = (tab: VivaldiTab): boolean => {
  if (tab.extData === '') return false
  if (getGroup(tab)) return true
  return false
}

const addGroup = (tab: VivaldiTab, groupId: string): VivaldiTab => {
  const newExtData: ExtData = {
    group: groupId
  }
  return {
    ...tab,
    extData: JSON.stringify(newExtData)
  }
}

const groupTabs = (tabs: VivaldiTab[], groupId: string): VivaldiTab[] => {
  const groupedTabs = tabs.map(tab => addGroup(tab, groupId))
  return groupedTabs
}

export {
  VivaldiTab,
  VivaldiUpdateProperties,
  chromeTabsUpdatePromise,
  chromeTabsGetPromise,
  isVivaldiTab,
  getGroup,
  hasGroup,
  addGroup,
  groupTabs
}
