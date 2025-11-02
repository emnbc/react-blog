import { Container, Title, Grid, GridCol, Paper, Stack, Text, Group, Avatar } from "@mantine/core";

const HomePage: React.FC = () => {
  return (
    <main>
      <Container size="xl" py="md">
        <Stack gap="md">
          <Title order={2}>Home</Title>
          <Grid>
            <GridCol span={{ base: 12, md: 8 }}>
              <Stack gap="sm">
                <Paper shadow="xs" p="md">
                  <Text>Latest posts will appear here</Text>
                </Paper>
                <Paper shadow="xs" p="md">
                  <Text>Another post preview</Text>
                </Paper>
              </Stack>
            </GridCol>
            <GridCol span={{ base: 12, md: 4 }}>
              <Stack gap="sm">
                <Paper shadow="xs" p="md">
                  <Text>Sidebar</Text>
                </Paper>
                <Paper shadow="xs" p="md">
                  <Stack gap="sm">
                    <Text fw={600}>Active users</Text>
                    <Group gap="sm">
                      <Avatar radius="xl" color="blue">
                        AK
                      </Avatar>
                      <Text>Anna Karenina</Text>
                    </Group>
                    <Group gap="sm">
                      <Avatar radius="xl" color="grape">
                        JB
                      </Avatar>
                      <Text>John Brown</Text>
                    </Group>
                    <Group gap="sm">
                      <Avatar radius="xl" color="teal">
                        MS
                      </Avatar>
                      <Text>Maria Sharapova</Text>
                    </Group>
                  </Stack>
                </Paper>
              </Stack>
            </GridCol>
          </Grid>
        </Stack>
      </Container>
    </main>
  );
};

export default HomePage;
