import { atom } from 'jotai';

const initCampaign = {
  selected: {
    product: 0,
    side: 'front',
    type: 0,
  },
  title: '',
  description: '',
  products: [],
  tags: [],
  design: {
    front: [],
    back: []
  },
  campaignLevel: 0,
  status: '',
  soldAmount: 0,
  createdAt: '',
  updatedAt: '',
  _id: ''
}

export const colors = [
  {
    name: "Black",
    color: "rgb(0, 0, 0)",
  },
  {
    name: "Cool Gray",
    color: "rgb(83, 86, 90)",
  },
  {
    name: "Cool Gray 2",
    color: "rgb(117, 120, 123)",
  },
  {
    name: "Cool Gray 3",
    color: "rgb(151, 153, 155)",
  },
  {
    name: "Cool Gray 4",
    color: "rgb(200, 201, 199)",
  },
  {
    name: "Light Gray",
    color: "rgb(209, 224, 215)",
  },
  {
    name: "Light Blue",
    color: "rgb(154, 219, 232)",
  },
  {
    name: "Cool Blue",
    color: "rgb(0, 156, 222)",
  },
  {
    name: "Blue",
    color: "rgb(48, 127, 226)",
  },
  {
    name: "Dark blue",
    color: "rgb(58, 93, 174)",
  },
  {
    name: "Dark blue 2",
    color: "rgb(30, 34, 170)",
  },
  {
    name: "Dark blue 3",
    color: "rgb(0, 48, 87)",
  },
  {
    name: "Dark Brown",
    color: "rgb(65, 39, 59)",
  },
  {
    name: "Dark Purple",
    color: "rgb(107, 48, 119)",
  },
  {
    name: "Purple",
    color: "rgb(187, 22, 163)",
  },
  {
    name: "Light Indigo",
    color: "rgb(149, 149, 210)",
  },
  {
    name: "Pink",
    color: "rgb(212, 139, 200)",
  },
  {
    name: "Light Pink",
    color: "rgb(232, 179, 195)",
  },
  {
    name: "Pink 2",
    color: "rgb(239, 96, 121)",
  },
  {
    name: "Pink 3",
    color: "rgb(240, 78, 152)",
  },
  {
    name: "Dark Pink",
    color: "rgb(206, 15, 105)",
  },
  {
    name: "Brown",
    color: "rgb(128, 47, 45)",
  },
  {
    name: "Red Brown",
    color: "rgb(171, 35, 40)",
  },
  {
    name: "Red",
    color: "rgb(210, 38, 48)",
  },
  {
    name: "Dark Orange",
    color: "rgb(225, 82, 61)",
  },
  {
    name: "Orange",
    color: "rgb(255, 106, 19)",
  },
  {
    name: "Light Orange",
    color: "rgb(255, 134, 116)",
  },
  {
    name: "Light Orange 2",
    color: "rgb(243, 207, 179)",
  },
  {
    name: "Dark Yellow",
    color: "rgb(238, 212, 132)",
  },
  {
    name: "Yellow",
    color: "rgb(246, 235, 97)",
  },
  {
    name: "Yellow 2",
    color: "rgb(243, 229, 0)",
  },
  {
    name: "Dark Orange 2",
    color: "rgb(240, 179, 35)",
  },
  {
    name: "Light Brown 2",
    color: "rgb(204, 138, 0)",
  },
  {
    name: "Brown 2",
    color: "rgb(158, 106, 56)",
  },
  {
    name: "Dark Brown",
    color: "rgb(103, 71, 54)",
  },
  {
    name: "Birch",
    color: "rgb(152, 72, 86)",
  },
  {
    name: "Light Brown 3",
    color: "rgb(212, 181, 158)",
  },
  {
    name: "Dark Green",
    color: "rgb(176, 170, 126)",
  },
  {
    name: "Green 2",
    color: "rgb(0, 199, 177)",
  },
  {
    name: "Light Green",
    color: "rgb(113, 204, 152)",
  },
  {
    name: "Light Green 2",
    color: "rgb(194, 225, 137)",
  },
  {
    name: "Green 3",
    color: "rgb(120, 214, 75)",
  },
  {
    name: "Green",
    color: "rgb(34, 136, 72)",
  },
  {
    name: "Dark Green",
    color: "rgb(33, 87, 50)",
  },
  {
    name: "Dark Green 2",
    color: "rgb(0, 94, 93)",
  },
  {
    name: "Dark Green 3",
    color: "rgb(0, 118, 129)",
  },
  {
    name: "Light Green 3",
    color: "rgb(148, 183, 187)",
  },
  {
    name: "White",
    color: "rgb(255, 255, 255)",
  },
];

export const fonts = [
  'Arial',
  "Pacifico",
  "VT323",
  "Quicksand",
  "Inconsolata",
  "RobotoMono",
]

export const authAtom = atom('')
export const userAtom = atom({
  name: null,
  phone: null,
  email: null,
  photo: null,
  createdAt: null,
  updatedAt: null,
  loaded: false
})

export const campaignAtom = atom({ ...initCampaign })
export const campaignStart = atom({ ...initCampaign })

export const designAtom = atom({ front: [], back: [] })

export const campaignPrintCrossed = atom(false)

export const canvasAtom = atom({})

interface IToast {
  type: 'warning' | 'info' | 'success' | 'error' | '',
  message: string
}

export const toastAtom = atom<IToast>({ type: '', message: '' }) // type = warning | info | success | error

export const isSavedAtom = atom(false)

export const imageTypes = [
  'image/jpg',
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/svg',
  'image/webp',
  'image/gif',
]

export const CART_STORAGE_KEY = "cartList"

export const cartAtom = atom(0)

export const revalidationTime = 600 // revalidation time for requests to call backend