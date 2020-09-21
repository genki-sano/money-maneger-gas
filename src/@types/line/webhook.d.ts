export type WebhookRequestBody = {
  destination: string
  events: WebhookEvent[]
}

export type WebhookEvent =
  | MessageEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | MemberJoinEvent
  | MemberLeaveEvent
  | PostbackEvent
  | BeaconEvent
  | AccountLinkEvent
  | DeviceLinkEvent
  | DeviceUnlinkEvent
  | LINEThingsScenarioExecutionEvent

export type EventBase = {
  mode: 'active' | 'standby'
  timestamp: number
  source: EventSource
}

export type EventSource = User | Group | Room

export type User = { type: 'user'; userId: string }

export type Group = {
  type: 'group'
  groupId: string
  userId?: string
}

export type Room = {
  type: 'room'
  roomId: string
  userId?: string
}

export type ReplyableEvent = EventBase & { replyToken: string }

export type MessageEvent = {
  type: 'message'
  message: EventMessage
} & ReplyableEvent

export type FollowEvent = { type: 'follow' } & ReplyableEvent

export type UnfollowEvent = { type: 'unfollow' } & EventBase

export type JoinEvent = { type: 'join' } & ReplyableEvent

export type LeaveEvent = { type: 'leave' } & EventBase

export type MemberJoinEvent = {
  type: 'memberJoined'
  joined: { members: User[] }
} & ReplyableEvent

export type MemberLeaveEvent = {
  type: 'memberLeft'
  left: { members: User[] }
} & EventBase

export type PostbackEvent = {
  type: 'postback'
  postback: Postback
} & ReplyableEvent

export type BeaconEvent = ReplyableEvent & {
  type: 'beacon'
  beacon: {
    type: 'enter' | 'leave' | 'banner' | 'stay'
    hwid: string
    dm?: string
  }
}

export type AccountLinkEvent = ReplyableEvent & {
  type: 'accountLink'
  link: {
    result: 'ok' | 'failed'
    nonce: string
  }
}

export type DeviceLinkEvent = ReplyableEvent & {
  type: 'things'
  things: {
    deviceId: string
    type: 'link'
  }
}

export type DeviceUnlinkEvent = ReplyableEvent & {
  type: 'things'
  things: {
    deviceId: string
    type: 'unlink'
  }
}

export type LINEThingsScenarioExecutionEvent = ReplyableEvent & {
  type: 'things'
  things: {
    type: 'scenarioResult'
    deviceId: string
    result: {
      scenarioId: string
      revision: number
      startTime: number
      endtime: number
      resultCode: 'success' | 'gatt_error' | 'runtime_error'
      actionResults: Array<LINEThingsActionResult>
      bleNotificationPayload?: string
      errorReason?: string
    }
  }
}

export type LINEThingsActionResult = {
  type: 'void' | 'binary'
  data?: string
}

export type EventMessage =
  | TextEventMessage
  | ImageEventMessage
  | VideoEventMessage
  | AudioEventMessage
  | LocationEventMessage
  | FileEventMessage
  | StickerEventMessage

export type EventMessageBase = { id: string }

export type TextEventMessage = {
  type: 'text'
  text: string
  emojis?: {
    index: number
    length: number
    productId: string
    emojiId: string
  }[]
} & EventMessageBase

export type ContentProvider<WithPreview extends boolean = true> =
  | { type: 'line' }
  | {
      type: 'external'
      originalContentUrl: string
      previewImageUrl: WithPreview extends true ? string : undefined
    }

export type ImageEventMessage = {
  type: 'image'
  contentProvider: ContentProvider
} & EventMessageBase

export type VideoEventMessage = {
  type: 'video'
  contentProvider: ContentProvider
} & EventMessageBase

export type AudioEventMessage = {
  type: 'audio'
  duration: number
  contentProvider: ContentProvider<false>
} & EventMessageBase

export type FileEventMessage = {
  type: 'file'
  fileName: string
  fileSize: string
} & EventMessageBase

export type LocationEventMessage = {
  type: 'location'
  title: string
  address: string
  latitude: number
  longitude: number
} & EventMessageBase

export type StickerEventMessage = {
  type: 'sticker'
  packageId: string
  stickerId: string
  stickerResourceType:
    | 'STATIC'
    | 'ANIMATION'
    | 'SOUND'
    | 'ANIMATION_SOUND'
    | 'POPUP'
    | 'POPUP_SOUND'
    | 'NAME_TEXT'
} & EventMessageBase

export type Postback = {
  data: string
  params?: {
    date?: string
    time?: string
    datetime?: string
  }
}
