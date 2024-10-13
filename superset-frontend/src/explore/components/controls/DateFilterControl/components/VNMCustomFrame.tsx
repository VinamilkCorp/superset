/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '@superset-ui/core';
// @ts-ignore
import { locales } from 'antd/dist/antd-with-locales';
import { RangePicker } from 'src/components/DatePicker';
import {
  customTimeRangeDecode,
  customTimeRangeEncode,
  dttmToMoment,
  LOCALE_MAPPING,
  MOMENT_FORMAT,
} from 'src/explore/components/controls/DateFilterControl/utils';
import {
  FrameComponentProps,
  VNMCustomRangeType,
} from 'src/explore/components/controls/DateFilterControl/types';
import { ExplorePageState } from 'src/explore/types';

export function VNMCustomFrame(props: FrameComponentProps) {
  const { customRange, matchedFlag } = customTimeRangeDecode(props.value);
  if (!matchedFlag) {
    props.onChange(customTimeRangeEncode(customRange));
  }
  const { sinceDatetime, untilDatetime } = { ...customRange };

  function onChange(newRange: VNMCustomRangeType) {
    props.onChange(
      customTimeRangeEncode({
        ...customRange,
        ...newRange,
        sinceMode: 'specific',
        untilMode: 'specific',
      }),
    );
  }

  // check if there is a locale defined for explore
  const localFromFlaskBabel = useSelector(
    (state: ExplorePageState) => state?.common?.locale,
  );
  // An undefined datePickerLocale is acceptable if no match is found in the LOCALE_MAPPING[localFromFlaskBabel] lookup
  // and will fall back to antd's default locale when the antd DataPicker's prop locale === undefined
  // This also protects us from the case where state is populated with a locale that antd locales does not recognize
  const datePickerLocale =
    locales[LOCALE_MAPPING[localFromFlaskBabel]]?.DatePicker;

  return (
    <div data-test="custom-frame">
      <div className="section-title">{t('Configure custom time range')}</div>

      <RangePicker
        placeholder={[t('Start date'), t('End date')]}
        defaultValue={[
          dttmToMoment(sinceDatetime).startOf('day'),
          dttmToMoment(untilDatetime).add(-1, 'days').startOf('day'),
        ]}
        onChange={momentRange => {
          if (!momentRange) {
            return;
          }

          onChange({
            sinceDatetime: momentRange[0]
              ? momentRange[0].startOf('day').format(MOMENT_FORMAT)
              : sinceDatetime,
            untilDatetime: momentRange[1]
              ? momentRange[1]
                  .clone()
                  .startOf('day')
                  .add(1, 'days')
                  .format(MOMENT_FORMAT)
              : untilDatetime,
          });
        }}
        picker="date"
        allowClear={false}
        locale={datePickerLocale}
      />
    </div>
  );
}
