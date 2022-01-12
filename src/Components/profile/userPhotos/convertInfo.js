import React from 'react';

export default function ConvertInfo({ selectFile }) {
  const validSizeNumber = (num) => {
    return num.toString().replace(/(?=\d)(?=(\d{3})+(?!\d))/g, ' ');
  };

  const convertDataSize = () => {
    if (selectFile) {
      // Convert number of bytes what have size of bytes 1B or greater
      var convertMBMoreThan1B = selectFile.size / 1000000000 / 1.024;
      // Convert number of bytes what have size of bytes 100M or greater
      var convertMBMoreThan100M = selectFile.size / 1000000 / 1.024;
      // Convert number of bytes what have size of bytes 10M or greater
      var convertMBMoreThan10M = selectFile.size / 1000000 / 1.024;
      // Convert number of bytes what have size of bytes 1M or greater
      var convertMBMoreThan1M = selectFile.size / 1000000 / 1.024;
      // Convert number of bytes what have size of bytes 100Thousands or greater
      var convertKBMoreThan100Thousands = selectFile.size / 1000 / 1.024;
      // Convert number of bytes what have size of bytes 10Thousands or greater
      var convertKBMoreThan10Thousands = selectFile.size / 1000 / 1.024;
      // Convert number of bytes what have size of bytes 1Thousands or greater
      var convertKBMoreThan1Thousands = selectFile.size / 1000 / 1.024;

      // Display number of bytes what greater or equal 1B bytes
      if (selectFile.size >= 1000000000) {
        console.log(convertMBMoreThan1B);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertMBMoreThan1B.toFixed(3))} GB`}
            </span>
          </div>
        );
      }
      // Display number of bytes what greater or equal 100M bytes
      if (selectFile.size >= 100000000) {
        console.log(convertMBMoreThan100M);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertMBMoreThan100M.toFixed(3))} MB`}
            </span>
          </div>
        );
      }

      // Display number of bytes what greater or equal 10M bytes
      if (selectFile.size >= 10000000) {
        console.log(convertMBMoreThan10M);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertMBMoreThan10M.toFixed(3))} MB`}
            </span>
          </div>
        );
      }

      // Display number of bytes what greater or equal 1M bytes
      if (selectFile.size >= 1000000) {
        console.log(convertMBMoreThan1M);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertMBMoreThan1M.toFixed(3))} MB`}
            </span>
          </div>
        );
      }

      // Display number of bytes what greater or equal 100Thousands bytes
      else if (selectFile.size >= 100000) {
        console.log(convertKBMoreThan100Thousands);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(
                convertKBMoreThan100Thousands.toFixed(3)
              )} KB`}
            </span>
          </div>
        );
      }

      // Display number of bytes what greater or equal 10Thousands bytes
      else if (selectFile.size >= 10000) {
        console.log(convertKBMoreThan10Thousands);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertKBMoreThan10Thousands.toFixed(3))} KB`}
            </span>
          </div>
        );
      }
      // Display number of bytes what greater or equal 1Thousands bytes
      else if (selectFile.size >= 1000) {
        console.log(convertKBMoreThan1Thousands);
        return (
          <div className='text-lg'>
            Current size of file: {` `}
            <span className='font-bold'>
              {`${validSizeNumber(convertKBMoreThan1Thousands.toFixed(3))} KB`}
            </span>
          </div>
        );
      } else {
        console.log('Cannot convert this bytes of info');
      }
    }
  };

  return {
    convertDataSize,
  };
}
