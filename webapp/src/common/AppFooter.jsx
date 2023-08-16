import { createStyles, Group, Image, Text } from "@mantine/core";
import Logo from 'assets/dt_logo_xl.png';
const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `0px ${
            theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: "flex",
        alignItems: "center",
        padding: `${theme.spacing.md}px ${theme.spacing.md}px`,

        [theme.fn.smallerThan("sm")]: {
            flexDirection: "column",
        },
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            marginTop: theme.spacing.lg,
            marginBottom: theme.spacing.sm,
        },
    },
}));

export default function AppFooter() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <div className={classes.inner}>
                <Image pl={10} width={40} src={Logo} />
                <Text sx={{color:'#1983AD'}} pl={10}>Frontend Development</Text>
                <Group className={classes.links}></Group>
            </div>
        </div>
    );
}
