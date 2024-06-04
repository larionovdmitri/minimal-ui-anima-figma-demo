import { m } from 'framer-motion';
import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  StackProps,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_MINIMAL_ON_STORE } from '../../routes/paths';
// _mock_
import { _homePlans } from '../../_mock/arrays';
// components
import { MotionViewport, varFade } from '../../components/animate';
import Iconify from '../../components/iconify';
import SvgColor from '../../components/svg-color';

import { Avatar, Input } from "@mui/material";
import "./style.css";

export const Questions = (): JSX.Element => {
  return (
    <div className="stack">
      <div className="text">
        <div className="flexible-plans-for-y">Still have questions?</div>
        <p className="text-wrapper">Please describe your case to receive the most accurate advice</p>
      </div>
      <div className="user-profile">
        <Input disableUnderline={false} fullWidth size="small" />
        <div className="div">
          <div className="actions">
            <div className="fab-soft">
              <img className="img" alt="Icons ic collections" src="ic-collections.svg" />
              <div className="label">Image/Video</div>
            </div>
            <div className="fab-soft">
              <img className="img" alt="Icons ic videocam" src="ic-videocam.svg" />
              <div className="label">Streaming</div>
            </div>
          </div>
          <Button color="primary" disabled={false} size="medium" variant="contained" />
        </div>
      </div>
      <div className="group">
        <Avatar variant="circular">Image</Avatar>
      </div>
      <div className="help-text">
        <p className="helper-text">We’ll get back to you within 20 minutes, or you can contact us via email.</p>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomePricingPlans() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Description />
        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack spacing={3} sx={{ mb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
          pricing plans
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2">
          The right plan for <br /> your business
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Choose the perfect plan for your needs. Always flexible to grow
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const isDesktop = useResponsive('up', 'md');

  const [currentTab, setCurrentTab] = useState('Standard');

  const desktopList = (
    <Box
      display="grid"
      gridTemplateColumns="repeat(3, 1fr)"
      sx={{ borderRadius: 2, border: (theme) => `dashed 1px ${theme.palette.divider}` }}
    >
      {_homePlans.map((plan) => (
        <m.div key={plan.license} variants={varFade().in}>
          <PlanCard key={plan.license} plan={plan} />
        </m.div>
      ))}
    </Box>
  );

  const mobileList = (
    <>
      <Stack alignItems="center" sx={{ mb: 5 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {_homePlans.map((tab) => (
            <Tab key={tab.license} value={tab.license} label={tab.license} />
          ))}
        </Tabs>
      </Stack>

      <Box
        sx={{
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {_homePlans.map(
          (tab) =>
            tab.license === currentTab && (
              <PlanCard
                key={tab.license}
                plan={tab}
                sx={{ borderLeft: (theme) => `dashed 1px ${theme.palette.divider}` }}
              />
            )
        )}
      </Box>
    </>
  );

  return (
    <>
      {isDesktop ? desktopList : mobileList}

      <m.div variants={varFade().in}>
        <Box
          sx={{
            textAlign: 'center',
            mt: {
              xs: 5,
              md: 10,
            },
          }}
        >
          <Questions />
          {/* <m.div variants={varFade().inDown}>
            <Typography variant="h4">Still have questions?</Typography>
          </m.div>

          <m.div variants={varFade().inDown}>
            <Typography sx={{ mt: 2, mb: 5, color: 'text.secondary' }}>
              Please describe your case to receive the most accurate advice.
            </Typography>
          </m.div>

          <m.div variants={varFade().inUp}>
            <Button color="inherit" disabled={false} size="large" variant="soft">
              Contact us
            </Button>
          </m.div> */}
        </Box>
      </m.div>
    </>
  );
}

// ----------------------------------------------------------------------

interface PlanCardProps extends StackProps {
  plan: {
    license: string;
    commons: string[];
    options: string[];
    icons: string[];
  };
}

function PlanCard({ plan, sx, ...other }: PlanCardProps) {
  const { license, commons, options, icons } = plan;

  const standard = license === 'Standard';

  const plus = license === 'Standard Plus';

  return (
    <Stack
      spacing={5}
      sx={{
        p: 5,
        pt: 10,
        ...(plus && {
          borderLeft: (theme) => `dashed 1px ${theme.palette.divider}`,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...sx,
        }),
      }}
      {...other}
    >
      <Stack spacing={2}>
        <Typography variant="overline" component="div" sx={{ color: 'text.disabled' }}>
          License
        </Typography>

        <Box sx={{ position: 'relative' }}>
          <Typography variant="h4">{license}</Typography>
          <Box
            sx={{
              left: 0,
              bottom: 4,
              width: 40,
              height: 8,
              opacity: 0.48,
              bgcolor: 'error.main',
              position: 'absolute',
              ...(standard && { bgcolor: 'primary.main' }),
              ...(plus && { bgcolor: 'warning.main' }),
            }}
          />
        </Box>
      </Stack>

      {standard ? (
        <SvgColor src={icons[2]} sx={{ width: 24, height: 24 }} />
      ) : (
        <Stack direction="row" spacing={2}>
          {icons.map((icon) => (
            <SvgColor key={icon} src={icon} sx={{ width: 24, height: 24 }} />
          ))}
        </Stack>
      )}

      <Stack spacing={2.5}>
        {commons.map((option) => (
          <Stack key={option} spacing={1} direction="row" alignItems="center">
            <Iconify icon="eva:checkmark-fill" width={16} />
            <Typography variant="body2">{option}</Typography>
          </Stack>
        ))}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {options.map((option, optionIndex) => {
          const disabled =
            (standard && optionIndex === 1) ||
            (standard && optionIndex === 2) ||
            (standard && optionIndex === 3) ||
            (plus && optionIndex === 3);

          return (
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              sx={{
                ...(disabled && { color: 'text.disabled' }),
              }}
              key={option}
            >
              <Iconify icon={disabled ? 'eva:close-fill' : 'eva:checkmark-fill'} width={16} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          );
        })}
      </Stack>

      <Stack alignItems="flex-end">
        <Button
          color="inherit"
          size="small"
          target="_blank"
          rel="noopener"
          href={PATH_MINIMAL_ON_STORE}
          endIcon={<Iconify icon="eva:chevron-right-fill" />}
        >
          Learn more
        </Button>
      </Stack>
    </Stack>
  );
}
