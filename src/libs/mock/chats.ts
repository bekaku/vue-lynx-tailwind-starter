import type { ApiResponse, GroupChatDto, GroupChatMsgDto } from "@/types/common";
import { userItems } from './users'
import { images as imageItemsData, pdfItemsData } from './files'

export const chatHistoryListApi: ApiResponse<GroupChatDto> = {
    dataList: [
        {
            id: 1,
            dtoAvatar: {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
                thumbnail: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Esther Howard',
            latestMessage: 'Quick one, team! Anyone',
            latestUpdate: '2026-04-21 13:55:25',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: true,
            favorite: true,
            muteNotify: false,
            online: true,
        },
        {
            id: 2,
            dtoAvatar: null,
            chatType: 'GROUP',
            groupName: 'Vue Team',
            latestMessage: 'Hey there! I\'ve heard about Vue. Any cool tips for getting started?',
            latestUpdate: '2025-02-20 15:45:12',
            latestMessageType: 'TEXT',
            totalNewMessage: 9,
            totalMembers: 38,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: true,
        },
        {
            id: 3,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/1.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Cody Fisher',
            latestMessage: 'Let\'s implement Vue. Elevating our UI game! 🚀',
            latestUpdate: '2025-01-21 09:42:30',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 4,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/3.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
            chatType: 'GROUP',
            groupName: 'Robert Fox',
            latestMessage: 'Interesting! Vue sounds amazing. What\'s your favorite feature?\n',
            latestUpdate: '2024-12-02 10:28:06',
            latestMessageType: 'TEXT',
            totalNewMessage: 8,
            totalMembers: 4,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: true,
        },
        {
            id: 5,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/79.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/79.jpg'
            },
            chatType: 'GROUP',
            groupName: 'Esther Howard',
            latestMessage: 'Quick one, team! Anyone',
            latestUpdate: '2024-11-30 19:48:38',
            latestMessageType: 'TEXT',
            totalNewMessage: 1,
            totalMembers: 8,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 6,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/21.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Darlene Robertson',
            latestMessage: null,
            latestUpdate: '2024-11-30 19:47:16',
            latestMessageType: 'IMAGE',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
            totalImages: 1,
            totalFile: 1,
        },
        {
            id: 7,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/44.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/44.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Ralph Edwards',
            latestMessage: 'Reflecting on Vue\'s impact o',
            latestUpdate: '2024-10-28 11:54:37',
            latestMessageType: 'TEXT',
            totalNewMessage: 10,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: true,
        },
        {
            id: 8,
            dtoAvatar: null,
            chatType: 'PERSONAL',
            groupName: 'SA-Tester',
            latestMessage: 'Test\n',
            latestUpdate: '2024-09-24 17:43:41',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: false,
        },
        {
            id: 9,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/22.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Robert Fox',
            latestMessage: 'Interesting! Vue sounds amazing. What\'s your favorite feature?\n',
            latestUpdate: '2024-09-20 09:04:14',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 10,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Darlene Robertson',
            latestMessage: null,
            latestUpdate: '2024-08-24 21:44:51',
            totalNewMessage: 0,
            totalMembers: 1,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
    ],
    totalPages: 1,
    totalElements: 15,
    last: true
}

export const chatMessageListApi: ApiResponse<GroupChatMsgDto> =
{
    dataList: [
        {
            id: 667,
            chatMsg: 'The rest of the documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for JavaScript, HTML and CSS if needed. Prior experience with other frameworks helps, but is not required.',
            msgDateTime: '2025-03-21 13:55:25',
            groupId: 17,
            readCount: 10,
            unsend: false,
            sent: true,
            sendUser: userItems[0],
            files: [],
            liked: false,
            emojiType: 'LIKE',
            reactionEngage: [{
                total: 1,
                emojiType: 'LIKE'
            }],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 666,
            chatMsg: 'Just sent emoji \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43 \uD83D\uDC4C \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43',
            msgDateTime: '2025-03-21 13:55:12',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: true,
            sendUser: userItems[1],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        // {
        //     id: 567,
        //     chatMsg: '13.9795581,100.6267777',
        //     msgDateTime: '2024-10-11 15:36:47',
        //     groupId: 17,
        //     readCount: 2,
        //     unsend: false,
        //     sent: true,
        //     sendUser: userItems[2],
        //     files: [],
        //     liked: false,
        //     emojiType: null,
        //     reactionEngage: [],
        //     dtoReplyTo: null,
        //     chatMessageType: 'LOCATION'
        // },
        {
            id: 665,
            chatMsg: 'https://www.youtube.com/watch?v=_5hAk3ic5Ok',
            msgDateTime: '2025-03-21 13:54:12',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: false,
            sendUser: userItems[2],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 664,
            chatMsg: 'This is pdf file.',
            msgDateTime: '2025-03-21 13:53:04',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: false,
            sendUser: userItems[3],
            files: [
                {
                    id: 152,
                    fileManager: pdfItemsData[0],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'FILE'
        },
        {
            id: 663,
            chatMsg: null,
            msgDateTime: '2025-03-21 13:52:48',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: true,
            sendUser: userItems[4],
            files: [
                {
                    id: 147,
                    fileManager: imageItemsData[0],
                },
                {
                    id: 148,
                    fileManager: imageItemsData[1],
                },
                {
                    id: 149,
                    fileManager: imageItemsData[2],
                },
                {
                    id: 150,
                    fileManager: imageItemsData[3],
                },
                {
                    id: 151,
                    fileManager: imageItemsData[4],
                },
                {
                    id: 152,
                    fileManager: imageItemsData[9],
                },
                {
                    id: 153,
                    fileManager: imageItemsData[10],
                },
                {
                    id: 154,
                    fileManager: imageItemsData[11],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LAUGH'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        },
        {
            id: 662,
            chatMsg: 'An approachable, performant and versatile framework for building web user interfaces.',
            msgDateTime: '2025-03-21 13:52:10',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: true,
            sendUser: userItems[5],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: {
                id: 667,
                chatMsg: 'they will have to be a topic to see the deference of options and show the Silly things that the world on the way are not the same as you want me vuejs I don\'t want you change springboot I don\'t have any plans ',
                msgDateTime: '2024-10-02 19:36:56',
                groupId: 17,
                readCount: 1,
                unsend: false,
                sent: false,
                sendUser: userItems[0],
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            chatMessageType: 'TEXT'
        },
        {
            id: 646,
            chatMsg: 'Message unsent.',
            msgDateTime: '2025-01-11 11:55:03',
            groupId: 17,
            readCount: 1,
            unsend: true,
            sent: false,
            sendUser: userItems[6],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'LOCATION'
        },
        {
            id: 645,
            chatMsg: 'Message with photo',
            msgDateTime: '2025-01-10 12:59:52',
            groupId: 17,
            readCount: 10,
            unsend: false,
            sent: true,
            sendUser: userItems[7],
            files: [
                {
                    id: 142,
                    fileManager: imageItemsData[5],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'SAD'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        },
        {
            id: 649,
            chatMsg: 'Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.',
            msgDateTime: '2025-01-10 12:42:20',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: false,
            sendUser: userItems[8],
            files: [],
            liked: true,
            emojiType: 'LIKE',
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LIKE'
                },
                {
                    total: 10,
                    emojiType: 'CARE'
                },
                {
                    total: 2,
                    emojiType: 'FIGHTING'
                },
                {
                    total: 1,
                    emojiType: 'LAUGH'
                },
                {
                    total: 1,
                    emojiType: 'SAD'
                },
                {
                    total: 1,
                    emojiType: 'WOW'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 644,
            chatMsg: null,
            msgDateTime: '2025-01-10 12:42:20',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: false,
            sendUser: userItems[8],
            files: [
                {
                    id: 141,
                    fileManager: imageItemsData[4],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LAUGH'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        }
    ],
    totalPages: 12,
    totalElements: 112,
    last: false
}