import { Typography } from '@folcode/clabs.atoms.typography'
import theme from '@folcode/clabs.others.theme-provider'
import { Delete } from '@mui/icons-material'
import mime from 'mime'

import { RFile } from 'utils/models/reactFormFieldsTabs'

import { fileListLocalStyles } from './fileList.styles'

const { colors } = theme

type FileListProps = {
  files: RFile[]
  onDelete: (index: number) => void
}

const FileList = ({ files, onDelete }: FileListProps) =>
  files.length ? (
    <div className="container">
      {files.map((file, index) => {
        const title = file.name.replace(/\.[^/.]+$/, '').slice(0, 20)

        const image = mime.getType(file.name)?.includes('image') && file.url ? file.url : ''

        return (
          <div key={file.id} className="file" style={{ '--background': `url(${image})` }}>
            <div className="caption">
              {image && <div className="icon-container" />}

              <Typography variant="s2" color={colors.neutrals[500]} className="title">
                {title}
              </Typography>
            </div>

            <Delete className="delete-icon" onClick={() => onDelete(index)} />
          </div>
        )
      })}

      <style jsx>{fileListLocalStyles}</style>
    </div>
  ) : null

export default FileList
