export type Message =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | LocationMessage
  | StickerMessage
  | ImageMapMessage
  | TemplateMessage
  | FlexMessage

export type MessageCommon = {
  quickReply?: QuickReply
  sender?: Sender
}

export type TextMessage = MessageCommon & {
  type: 'text'
  text: string
  emojis?: Emoji[]
}

export type Emoji = {
  index: number
  productId: string
  emojiId: string
}

export type ImageMessage = MessageCommon & {
  type: 'image'
  originalContentUrl: string
  previewImageUrl: string
}

export type VideoMessage = MessageCommon & {
  type: 'video'
  originalContentUrl: string
  previewImageUrl: string
}

export type AudioMessage = MessageCommon & {
  type: 'audio'
  originalContentUrl: string
  duration: number
}

export type LocationMessage = MessageCommon & {
  type: 'location'
  title: string
  address: string
  latitude: number
  longitude: number
}

export type StickerMessage = MessageCommon & {
  type: 'sticker'
  packageId: string
  stickerId: string
}

export type ImageMapMessage = MessageCommon & {
  type: 'imagemap'
  baseUrl: string
  altText: string
  baseSize: Size
  video?: {
    originalContentUrl: string
    previewImageUrl: string
    area: Area
    externalLink?: {
      linkUri: string
      label: string
    }
  }
  actions: ImageMapAction[]
}

export type TemplateMessage = MessageCommon & {
  type: 'template'
  altText: string
  template: TemplateContent
}

export type FlexMessage = MessageCommon & {
  type: 'flex'
  altText: string
  contents: FlexContainer
}

export type ImageMapAction = ImageMapURIAction | ImageMapMessageAction

export type ImageMapActionBase = {
  label?: string
  area: Area
}

export type ImageMapURIAction = {
  type: 'uri'
  linkUri: string
} & ImageMapActionBase

export type ImageMapMessageAction = {
  type: 'message'
  text: string
} & ImageMapActionBase

export type Area = {
  x: number
  y: number
  width: number
  height: number
}

export type FlexContainer = FlexBubble | FlexCarousel

export type FlexBubble = {
  type: 'bubble'
  size?: 'nano' | 'micro' | 'kilo' | 'mega' | 'giga'
  direction?: 'ltr' | 'rtl'
  header?: FlexBox
  hero?: FlexBox | FlexImage
  body?: FlexBox
  footer?: FlexBox
  styles?: FlexBubbleStyle
  action?: Action
}

export type FlexBubbleStyle = {
  header?: FlexBlockStyle
  hero?: FlexBlockStyle
  body?: FlexBlockStyle
  footer?: FlexBlockStyle
}

export type FlexBlockStyle = {
  backgroundColor?: string
  separator?: boolean
  separatorColor?: string
}

export type FlexCarousel = {
  type: 'carousel'
  contents: FlexBubble[]
}

export type FlexComponent =
  | FlexBox
  | FlexButton
  | FlexImage
  | FlexIcon
  | FlexText
  | FlexSpan
  | FlexSeparator
  | FlexFiller
  | FlexSpacer

export type FlexBox = {
  type: 'box'
  layout: 'horizontal' | 'vertical' | 'baseline'
  contents: FlexComponent[]
  backgroundColor?: string
  borderColor?: string
  borderWidth?:
    | string
    | 'none'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semi-bold'
    | 'bold'
  cornerRadius?: string | 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  width?: string
  height?: string
  flex?: number
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  paddingAll?: string
  paddingTop?: string
  paddingBottom?: string
  paddingStart?: string
  paddingEnd?: string
  action?: Action
} & Offset

export type Offset = {
  position?: 'relative' | 'absolute'
  offsetTop?: string
  offsetBottom?: string
  offsetStart?: string
  offsetEnd?: string
}

export type FlexButton = {
  type: 'button'
  action: Action
  flex?: number
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  height?: 'sm' | 'md'
  style?: 'link' | 'primary' | 'secondary'
  color?: string
  gravity?: 'top' | 'bottom' | 'center'
} & Offset

export type FlexFiller = {
  type: 'filler'
  flex?: number
}

export type FlexIcon = {
  type: 'icon'
  url: string
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '3xl'
    | '4xl'
    | '5xl'
  aspectRatio?: string
} & Offset

export type FlexImage = {
  type: 'image'
  url: string
  flex?: number
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  align?: 'start' | 'end' | 'center'
  gravity?: 'top' | 'bottom' | 'center'
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '3xl'
    | '4xl'
    | '5xl'
    | 'full'
  aspectRatio?: string
  aspectMode?: 'cover' | 'fit'
  backgroundColor?: string
  action?: Action
} & Offset

export type FlexSeparator = {
  type: 'separator'
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  color?: string
}

export type FlexSpacer = {
  type: 'spacer'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
}

export type FlexText = {
  type: 'text'
  text: string
  contents?: FlexSpan[]
  flex?: number
  margin?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | '3xl'
    | '4xl'
    | '5xl'
  align?: 'start' | 'end' | 'center'
  gravity?: 'top' | 'bottom' | 'center'
  wrap?: boolean
  maxLines?: number
  weight?: 'regular' | 'bold'
  color?: string
  action?: Action
  style?: string
  decoration?: string
} & Offset

export type FlexSpan = {
  type: 'span'
  text: string
  color?: string
  size?: string
  weight?: string
  style?: string
  decoration?: string
}

export type TemplateContent =
  | TemplateButtons
  | TemplateConfirm
  | TemplateCarousel
  | TemplateImageCarousel

export type TemplateButtons = {
  type: 'buttons'
  thumbnailImageUrl?: string
  imageAspectRatio?: 'rectangle' | 'square'
  imageSize?: 'cover' | 'contain'
  imageBackgroundColor?: string
  title?: string
  text: string
  actions: Action[]
}

export type TemplateConfirm = {
  type: 'confirm'
  text: string
  actions: Action[]
}

export type TemplateCarousel = {
  type: 'carousel'
  columns: TemplateColumn[]
  imageAspectRatio?: 'rectangle' | 'square'
  imageSize?: 'cover' | 'contain'
}

export type TemplateColumn = {
  thumbnailImageUrl?: string
  imageBackgroundColor?: string
  title?: string
  text: string
  defaultAction?: Action
  actions: Action[]
}

export type TemplateImageCarousel = {
  type: 'image_carousel'
  columns: TemplateImageColumn[]
}

export type TemplateImageColumn = {
  imageUrl: string
  action: Action<{ label?: string }>
}

export type QuickReply = { items: QuickReplyItem[] }

export type QuickReplyItem = {
  type: 'action'
  imageUrl?: string
  action: Action
}

export type Sender = {
  name?: string
  iconUrl?: string
}

export type Action<ExtraFields = { label: string }> = (
  | PostbackAction
  | MessageAction
  | URIAction
  | DatetimePickerAction
  | { type: 'camera' }
  | { type: 'cameraRoll' }
  | { type: 'location' }
) &
  ExtraFields

export type PostbackAction = {
  type: 'postback'
  data: string
  text?: string
  displayText?: string
}

export type MessageAction = {
  type: 'message'
  text: string
}

export type URIAction = {
  type: 'uri'
  uri: string
  altUri?: AltURI
}

export type AltURI = {
  desktop: string
}

export type DatetimePickerAction = {
  type: 'datetimepicker'
  data: string
  mode: 'date' | 'time' | 'datetime'
  initial?: string
  max?: string
  min?: string
}

export type Size = {
  width: number
  height: number
}
