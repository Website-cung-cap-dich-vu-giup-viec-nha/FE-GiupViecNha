import { Typography } from "@mui/material";


export default function StaffData({ data }) {
  return {
    columns: [
      { name: "STT", align: "center", sortable: "true" },
      { name: "MÃ NHÂN VIÊN", align: "center" },
      { name: "TÊN NGƯỜI DÙNG", align: "center" },
      { name: "ĐỊA CHỈ IP", align: "center" },
      { name: "TÁC NHÂN", align: "center" },
      { name: "NỘI DUNG", align: "center" },
      { name: "THỜI GIAN", align: "center" },
    ],

    rows: data.map((item, index) => ({
      STT: (
        <Typography variant="caption" color="text" fontWeight="medium" title={index + 1}>
          {index + 1}
        </Typography>
      ),
      "MÃ NHÂN VIÊN": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.staffId}>
          {item.staffId}
        </Typography>
      ),
      "TÊN NGƯỜI DÙNG": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.username}>
          {item.name}
        </Typography>
      ),
      "ĐỊA CHỈ IP": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.ipAddress}>
          {item.ipAddress}
        </Typography>
      ),
      "TÁC NHÂN": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.agent}>
          {item.agent}
        </Typography>
      ),
      "NỘI DUNG": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.content}>
          {item.content}
        </Typography>
      ),
      "THỜI GIAN": (
        <Typography variant="caption" color="text" fontWeight="medium" title={item.time}>
          {item.time}
        </Typography>
      ),
    })),
  };
}
