import {
  VivaldiTab,
  isVivaldiTab,
  getGroup,
  hasGroup,
  addGroup
} from '@/tab'

const chromeTab: chrome.tabs.Tab = {
  active: true,
  audible: false,
  autoDiscardable: true,
  discarded: false,
  groupId: -1,
  height: 0,
  highlighted: true,
  id: 0,
  incognito: false,
  index: 1,
  mutedInfo: {
      muted: false
  },
  openerTabId: 1,
  pinned: false,
  selected: true,
  status: 'loading',
  width: 0,
  windowId: 1
}

const vivaldiTab: VivaldiTab = {
  ...chromeTab,
  extData: ''
}

describe('isVivaldiTab', () => {
  it('vivaldi tab', () => {
    expect(isVivaldiTab(vivaldiTab)).toBe(true)
  })
  it('chrome tab', () => {
    expect(isVivaldiTab(chromeTab)).toBe(false)
  })
})

describe('getGroup', () => {
  const tab: VivaldiTab = {
    ...vivaldiTab,
  }
  it('case1', () => {
    tab.extData = '{"group":"123"}'
    expect(getGroup(tab)).toBe("123")
  })
  it('case2', () => {
    tab.extData = '{"group":"helloworld"}'
    expect(getGroup(tab)).toBe("helloworld")
  })
})

describe('hasGroup', () => {
  it('belong group', () => {
    const tab: VivaldiTab = {
      ...vivaldiTab,
      extData: '{"group":"0"}'
    }
    expect(hasGroup(tab)).toBe(true)
  })

  it('don\'t belong group', () => {
    expect(hasGroup(vivaldiTab)).toBe(false)

    const tab: VivaldiTab = {
      ...vivaldiTab,
      extData: '{"group":""}'
    }
    expect(hasGroup(tab)).toBe(false)
  })
})

describe('addGroup', () => {
  it('add', () => {
    const groupId: string = '334'
    expect(addGroup(vivaldiTab, groupId)).toEqual({
      ...chromeTab,
      extData: '{"group":"334"}'
    })
  })

  it('move', () => {
    const groupId: string = '0123456789abcdef'
    const tab: VivaldiTab = {
      ...vivaldiTab,
      extData: '{"group":"0"}'
    }
    expect(addGroup(tab, groupId)).toEqual({
      ...tab,
      extData: '{"group":"0123456789abcdef"}'
    })
  })
})
