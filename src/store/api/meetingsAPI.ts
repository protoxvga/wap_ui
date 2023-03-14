import { CreateMeeting } from "./types/queryParams";
import { wapAPI } from "./wapAPI";

const meetingsApi = wapAPI.injectEndpoints({
    endpoints: (build) => ({
        getMeetings: build.query<any, void>({
            query: () => ({
                url: "rendezVous/list",
                method: 'GET',
            }),
        }),
        createMeeting: build.mutation<any, CreateMeeting>({
            query: ({ meeting }) => ({
                url: "rendezVous/create",
                method: 'POST',
                body: {
                    title: meeting.title,
                    date: meeting.date,
                    agenda: meeting.agenda,
                    duration: meeting.duration,
                    location: meeting.location,
                    ...(meeting.newGroup && {
                        newGroup: {
                            name: meeting.newGroup.name,
                            color: meeting.newGroup.color,
                            duration: meeting.newGroup.duration,
                            location: meeting.newGroup.location,
                        },
                    }),
                    ...(meeting.groupId && { groupId: meeting.groupId }),
                }
            }),
        }),
    }),
    overrideExisting: true,
});
  
export const { useGetMeetingsQuery, useCreateMeetingMutation } = meetingsApi;