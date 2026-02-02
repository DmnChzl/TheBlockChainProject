import * as FileUtils from '@shared/utils/fileUtils';

describe('File Utils', () => {
  it('should return bytes as number', () => {
    const size = 10 * 1024 * 1024;
    expect(FileUtils.formatBytes(size)).toEqual('10 MB');
  });

  it('should return extension as string', () => {
    expect(FileUtils.getFileExtension('document.pdf')).toEqual('.pdf');
    expect(FileUtils.getFileExtension('image.png')).toEqual('.png');
  });
});
