import fetch from 'src/common/fetch'
import { deleteEmptyProperty } from 'src/common/filter'
import { deepCoyp } from 'src/common/copy'

export function testReportUrl(body) {
  const bodyCopy = deepCoyp(body)
  return fetch({
    url: 'xqh/ad/appMedia/test/report/url',
    method: 'post',
    data: bodyCopy,
  })
}


export function testReportData() {
  return fetch({
    url: '/xqh/ad/appMedia/test/report/data',
    method: 'get'
  })
}


