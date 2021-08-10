import request from '@/utils/request'

export const getAllChannels = () => {
  return request({
    methods: 'GET',
    url: '/app/v1_0/chaannels'
  })
}
