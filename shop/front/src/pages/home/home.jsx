import { Typography } from "@mui/material";
import * as React from "react";

export default function TypographyTheme() {
  return (
    <article>
      <Typography variant="h4">Shop - pet project</Typography>
      <section>
        <Typography variant="subtitle1" color="text.secondary">
          This project was carried out as part of the educational process.
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Цей проект був виконаний в рамках навчального процесу.
        </Typography>
      </section>
    </article>
  );
}
